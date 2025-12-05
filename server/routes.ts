import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import {
  importFromCsv,
  exportToCsv,
  generatePdfReport,
} from "./utils/importExport";
import { calculateCarbonFootprint } from "./utils/calculators";
import {
  insertEmissionsDataSchema,
  insertResourceConsumptionSchema,
  insertReportSchema,
} from "@shared/schema";
import { setupAuth } from "./auth";
import { ZodError } from "zod";
import paymentRoutes from "./routes/payment";
import { Document, Packer, Paragraph, TextRun } from "docx";
import puppeteer from "puppeteer";
const upload = multer({ storage: multer.memoryStorage() });

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication
  setupAuth(app);

  // Payment routes
  app.use("/api/payments", paymentRoutes);

  // API routes
  const apiRouter = app.use("/api", (req, res, next) => {
    next();
  });

  // Current user - redirect to /api/user
  app.get("/api/me", async (req, res) => {
    if (!req.isAuthenticated()) {
      // Mock user for demo if not authenticated
      const demoUser = await storage.getUserByUsername("demo");
      if (demoUser) {
        // Don't return password
        const { password, ...userWithoutPassword } = demoUser;
        return res.json(userWithoutPassword);
      }
      return res.status(401).json({ message: "Not authenticated" });
    }

    // Don't return password
    const { password, ...userWithoutPassword } = req.user;
    res.json(userWithoutPassword);
  });

  // Organizations
  app.get("/api/organizations", async (req, res) => {
    const organizations = await storage.listOrganizations();
    res.json(organizations);
  });

  // Emissions Data
  app.get("/api/emissions", async (req, res) => {
    const { organizationId, year, month } = req.query;

    if (!organizationId) {
      return res.status(400).json({ message: "Organization ID is required" });
    }

    let emissions;
    if (year) {
      emissions = await storage.getEmissionsDataByPeriod(
        Number(organizationId),
        Number(year),
        month ? Number(month) : undefined
      );
    } else {
      emissions = await storage.listEmissionsData(Number(organizationId));
    }

    res.json(emissions);
  });

  app.post("/api/emissions", async (req, res) => {
    try {
      const validData = insertEmissionsDataSchema.parse(req.body);
      const data = await storage.createEmissionsData(validData);
      res.status(201).json(data);
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create emissions data" });
    }
  });

  // Resource Consumption
  app.get("/api/resources", async (req, res) => {
    const { organizationId, type, year, month } = req.query;

    if (!organizationId) {
      return res.status(400).json({ message: "Organization ID is required" });
    }

    let resources;
    if (year) {
      resources = await storage.getResourceConsumptionByPeriod(
        Number(organizationId),
        Number(year),
        month ? Number(month) : undefined
      );
    } else {
      resources = await storage.listResourceConsumption(
        Number(organizationId),
        type as string | undefined
      );
    }

    res.json(resources);
  });

  app.post("/api/resources", async (req, res) => {
    try {
      const validData = insertResourceConsumptionSchema.parse(req.body);
      const data = await storage.createResourceConsumption(validData);
      res.status(201).json(data);
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ message: "Invalid data", errors: error.errors });
      }
      res
        .status(500)
        .json({ message: "Failed to create resource consumption data" });
    }
  });

  // Reports
  app.get("/api/reports", async (req, res) => {
    const { organizationId } = req.query;

    if (!organizationId) {
      return res.status(400).json({ message: "Organization ID is required" });
    }

    const reports = await storage.listReports(Number(organizationId));
    res.json(reports);
  });

  app.post("/api/reports", async (req, res) => {
    try {
      const validData = insertReportSchema.parse(req.body);
      const report = await storage.createReport(validData);
      res.status(201).json(report);
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create report" });
    }
  });

  app.patch("/api/reports/:id/status", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const report = await storage.updateReportStatus(Number(id), status);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json(report);
  });

  // Generate PDF report
  app.get("/api/reports/:id/pdf", async (req, res) => {
    const { id } = req.params;

    const report = await storage.getReport(Number(id));
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    try {
      const pdfBuffer = await generatePdfReport(report);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${report.reportName.replace(/\s+/g, "_")}.pdf`
      );
      res.send(pdfBuffer);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate PDF" });
    }
  });

  // Activities
  app.get("/api/activities", async (req, res) => {
    const { organizationId, limit } = req.query;

    if (!organizationId) {
      return res.status(400).json({ message: "Organization ID is required" });
    }

    const activities = await storage.listActivities(
      Number(organizationId),
      limit ? Number(limit) : undefined
    );

    res.json(activities);
  });

  // Import data from CSV
  app.post("/api/import/emissions", upload.single("file"), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { organizationId, createdBy } = req.body;

    if (!organizationId || !createdBy) {
      return res
        .status(400)
        .json({ message: "Organization ID and creator ID are required" });
    }

    try {
      const result = await importFromCsv(
        req.file.buffer,
        "emissions",
        Number(organizationId),
        Number(createdBy)
      );

      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to import data" });
    }
  });

  app.post("/api/import/resources", upload.single("file"), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { organizationId, resourceType, createdBy } = req.body;

    if (!organizationId || !resourceType || !createdBy) {
      return res.status(400).json({
        message: "Organization ID, resource type, and creator ID are required",
      });
    }

    try {
      const result = await importFromCsv(
        req.file.buffer,
        resourceType,
        Number(organizationId),
        Number(createdBy)
      );

      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to import data" });
    }
  });

  // Export data to CSV
  app.get("/api/export/emissions", async (req, res) => {
    const { organizationId, year } = req.query;

    if (!organizationId || !year) {
      return res
        .status(400)
        .json({ message: "Organization ID and year are required" });
    }

    try {
      const csvBuffer = await exportToCsv(
        "emissions",
        Number(organizationId),
        Number(year)
      );

      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=emissions_${year}.csv`
      );
      res.send(csvBuffer);
    } catch (error) {
      res.status(500).json({ message: "Failed to export data" });
    }
  });

  app.get("/api/export/resources/:type", async (req, res) => {
    const { organizationId, year } = req.query;
    const { type } = req.params;

    if (!organizationId || !year) {
      return res
        .status(400)
        .json({ message: "Organization ID and year are required" });
    }

    try {
      const csvBuffer = await exportToCsv(
        type,
        Number(organizationId),
        Number(year)
      );

      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${type}_${year}.csv`
      );
      res.send(csvBuffer);
    } catch (error) {
      res.status(500).json({ message: "Failed to export data" });
    }
  });

  // Report export functionality
  app.post("/api/reports/export", async (req, res) => {
    try {
      const format = req.query.format as string | undefined;
      const reportData = req.body;
      console.log("Exporting report data:", reportData);
      if (!format) {
        return res.status(400).json({ message: "Export format is required" });
      }

      let buffer: Buffer;
      let contentType: string;
      let filename: string;

      // Optional: generate filename with date
      const safeTitle = reportData.title
        ? reportData.title.replace(/\s+/g, "_").toLowerCase()
        : "sustainability_report";
      const dateStr = new Date().toISOString().slice(0, 10);

      //     switch (format) {
      //       case "pdf": {
      //         const htmlContent = `
      //   <html>
      //     <head>
      //       <title>${reportData.title || "Sustainability Report"}</title>
      //       <style>
      //         body { font-family: Arial, sans-serif; margin: 40px; }
      //         h1 { font-size: 24px; color: #333; margin-bottom: 30px; }
      //         h2 { font-size: 18px; color: #555; margin-top: 20px; margin-bottom: 5px; }
      //         p { font-size: 14px; color: #333; margin-bottom: 15px; }
      //         .section { margin-bottom: 20px; }
      //       </style>
      //     </head>
      //     <body>
      //       <h1>${reportData.title || "Sustainability Report"}</h1>
      //       ${Object.entries(reportData || {})
      //         .filter(([key]) => key !== "title") // skip title field (already shown)
      //         .map(
      //           ([key, value]) => `
      //             <div class="section">
      //               <h2>${key}</h2>
      //               <p>${value || ""}</p>
      //             </div>
      //           `
      //         )
      //         .join("")}
      //     </body>
      //   </html>
      // `;

      //         const browser = await puppeteer.launch({
      //           args: ["--no-sandbox", "--disable-setuid-sandbox"],
      //         });
      //         const page = await browser.newPage();
      //         await page.setContent(htmlContent, { waitUntil: "networkidle0" });
      //         buffer = await page.pdf({ format: "A4" });
      //         await browser.close();

      //         contentType = "application/pdf";
      //         filename = `${safeTitle}_${dateStr}.pdf`;
      //         break;
      //       }

      //       // case "docx": {
      //       //   const paragraphs: Paragraph[] = [
      //       //     new Paragraph({
      //       //       children: [
      //       //         new TextRun({
      //       //           text: reportData.title || "Sustainability Report",
      //       //           bold: true,
      //       //           size: 32,
      //       //         }),
      //       //       ],
      //       //       spacing: { after: 300 },
      //       //     }),
      //       //   ];

      //       //   for (const section of reportData.sections || []) {
      //       //     paragraphs.push(
      //       //       new Paragraph({
      //       //         children: [
      //       //           new TextRun({
      //       //             text: section.title || "",
      //       //             bold: true,
      //       //             size: 28,
      //       //           }),
      //       //         ],
      //       //         spacing: { after: 200 },
      //       //       })
      //       //     );

      //       //     if (section.content) {
      //       //       paragraphs.push(
      //       //         new Paragraph({
      //       //           children: [new TextRun({ text: section.content, size: 24 })],
      //       //           spacing: { after: 200 },
      //       //         })
      //       //       );
      //       //     }

      //       //     for (const sub of section.subsections || []) {
      //       //       paragraphs.push(
      //       //         new Paragraph({
      //       //           children: [
      //       //             new TextRun({
      //       //               text: sub.title || "",
      //       //               italics: true,
      //       //               size: 26,
      //       //             }),
      //       //           ],
      //       //           spacing: { after: 100 },
      //       //         })
      //       //       );

      //       //       if (sub.content) {
      //       //         paragraphs.push(
      //       //           new Paragraph({
      //       //             children: [new TextRun({ text: sub.content, size: 24 })],
      //       //             spacing: { after: 150 },
      //       //           })
      //       //         );
      //       //       }
      //       //     }
      //       //   }

      //       //   const doc = new Document({ sections: [{ children: paragraphs }] });
      //       //   buffer = await Packer.toBuffer(doc);

      //       //   contentType =
      //       //     "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      //       //   filename = `${safeTitle}_${dateStr}.docx`;
      //       //   break;
      //       // }

      //       case "docx": {
      //         // const paragraphs: Paragraph[] = [];

      //         // // Main report title (header)
      //         // paragraphs.push(
      //         //   new Paragraph({
      //         //     children: [
      //         //       new TextRun({
      //         //         text: reportData.title || "Sustainability Report",
      //         //         bold: true,
      //         //         size: 32,
      //         //       }),
      //         //     ],
      //         //     spacing: { after: 300 },
      //         //   })
      //         // );

      //         // // Loop through all key-value pairs
      //         // for (const [key, value] of Object.entries(reportData || {})) {
      //         //   if (key === "title") continue; // Title is already used

      //         //   // Section title (key)
      //         //   paragraphs.push(
      //         //     new Paragraph({
      //         //       children: [
      //         //         new TextRun({
      //         //           text: key,
      //         //           bold: true,
      //         //           size: 26,
      //         //         }),
      //         //       ],
      //         //       spacing: { after: 150 },
      //         //     })
      //         //   );

      //         //   // Section content (value)
      //         //   paragraphs.push(
      //         //     new Paragraph({
      //         //       children: [
      //         //         new TextRun({
      //         //           text: value || "",
      //         //           size: 24,
      //         //         }),
      //         //       ],
      //         //       spacing: { after: 250 },
      //         //     })
      //         //   );
      //         // }

      //         // const doc = new Document({ sections: [{ children: paragraphs }] });
      //         // buffer = await Packer.toBuffer(doc);

      //         // contentType =
      //         //   "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      //         // filename = `${safeTitle}_${dateStr}.docx`;
      //         // break;
      //         const paragraphs: Paragraph[] = [];

      //         // Title
      //         paragraphs.push(
      //           new Paragraph({
      //             children: [
      //               new TextRun({
      //                 text: reportData.title || "Sustainability Report",
      //                 bold: true,
      //                 size: 32,
      //               }),
      //             ],
      //             spacing: { after: 300 },
      //           })
      //         );

      //         // Body content
      //         for (const [key, value] of Object.entries(reportData)) {
      //           if (key === "title" || !value) continue;

      //           // const label = griLabels[key] || key;

      //           paragraphs.push(
      //             new Paragraph({
      //               children: [new TextRun({ text: key, bold: true, size: 26 })],
      //               spacing: { after: 100 },
      //             }),
      //             new Paragraph({
      //               children: [new TextRun({ text: value, size: 24 })],
      //               spacing: { after: 250 },
      //             })
      //           );
      //         }

      //         const doc = new Document({ sections: [{ children: paragraphs }] });
      //         buffer = await Packer.toBuffer(doc);

      //         contentType =
      //           "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      //         filename = `${safeTitle}_${dateStr}.docx`;
      //         break;
      //       }

      //       case "csv": {
      //         const csvData: string[][] = [["Field", "Content"]];

      //         // Flatten the object into CSV rows
      //         for (const [key, value] of Object.entries(reportData || {})) {
      //           csvData.push([key, value || ""]);
      //         }

      //         // Convert to CSV string with proper escaping
      //         const csvString = csvData
      //           .map((row) =>
      //             row
      //               .map((cell) => `"${(cell || "").replace(/"/g, '""')}"`)
      //               .join(",")
      //           )
      //           .join("\n");

      //         buffer = Buffer.from(csvString, "utf-8");
      //         contentType = "text/csv";
      //         filename = `${safeTitle}_${dateStr}.csv`;
      //         break;
      //       }

      //       default:
      //         return res
      //           .status(400)
      //           .json({ message: `Unsupported format: ${format}` });
      //     }

      switch (format) {
        //       case "pdf": {
        //         const htmlContent = `
        //   <html>
        //     <head>
        //       <title>${reportData.title || "Sustainability Report"}</title>
        //       <style>
        //         body { font-family: Arial, sans-serif; margin: 40px; }
        //         h1 { font-size: 24px; color: #333; margin-bottom: 30px; }
        //         h2 { font-size: 18px; color: #555; margin-top: 20px; margin-bottom: 5px; }
        //         p { font-size: 14px; color: #333; margin-bottom: 15px; }
        //         .section { margin-bottom: 20px; }
        //       </style>
        //     </head>
        //     <body>
        //       <h1>${reportData.title || "Sustainability Report"}</h1>
        //       ${Object.entries(reportData || {})
        //         .filter(([key]) => key !== "title")
        //         .map(
        //           ([key, value]) => `
        //             <div class="section">
        //               <h2>${key}</h2>
        //               <p>${value || ""}</p>
        //             </div>
        //           `
        //         )
        //         .join("")}
        //     </body>
        //   </html>
        // `;

        //         const browser = await puppeteer.launch({
        //           headless: true,
        //           args: ["--no-sandbox", "--disable-setuid-sandbox"],
        //         });
        //         const page = await browser.newPage();
        //         await page.setContent(htmlContent, { waitUntil: "networkidle0" });

        //         // Optional: Use 'path' to save to file and debug
        //         const pdfUint8Array = await page.pdf({
        //           format: "A4",
        //           printBackground: true,
        //         });
        //         buffer = Buffer.from(pdfUint8Array);

        //         await browser.close();

        //         contentType = "application/pdf";
        //         filename = `${safeTitle}_${dateStr}.pdf`;
        //         break;
        //       }
        //       case "pdf": {
        //         const htmlContent = `
        //   <html>
        //     <head>
        //       <title>${reportData.title || "Sustainability Report"}</title>
        //       <style>
        //         body {
        //           font-family: "Segoe UI", Arial, sans-serif;
        //           margin: 40px;
        //           background: #f9f9f9;
        //           color: #333;
        //         }
        //         h1 {
        //           font-size: 28px;
        //           color: #2c3e50;
        //           margin-bottom: 40px;
        //           border-bottom: 2px solid #2ecc71;
        //           padding-bottom: 10px;
        //         }
        //         h2 {
        //           font-size: 20px;
        //           color: #27ae60;
        //           margin-top: 25px;
        //           margin-bottom: 10px;
        //         }
        //         p {
        //           font-size: 14px;
        //           line-height: 1.6;
        //           color: #555;
        //           margin-bottom: 15px;
        //         }
        //         .section {
        //           background: #fff;
        //           padding: 20px;
        //           margin-bottom: 20px;
        //           border-radius: 8px;
        //           box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        //         }
        //       </style>
        //     </head>
        //     <body>
        //       <h1>${reportData.title || "Sustainability Report"}</h1>
        //       ${Object.entries(reportData || {})
        //         .filter(
        //           ([key, value]) =>
        //             key !== "title" && value && String(value).trim() !== ""
        //         )
        //         .map(
        //           ([key, value]) => `
        //           <div class="section">
        //             <h2>${key}</h2>
        //             <p>${value}</p>
        //           </div>
        //         `
        //         )
        //         .join("")}
        //     </body>
        //   </html>
        // `;

        //         const browser = await puppeteer.launch({
        //           headless: true,
        //           args: ["--no-sandbox", "--disable-setuid-sandbox"],
        //         });

        //         const page = await browser.newPage();
        //         await page.setContent(htmlContent, { waitUntil: "networkidle0" });

        //         const pdfUint8Array = await page.pdf({
        //           format: "A4",
        //           printBackground: true,
        //         });
        //         buffer = Buffer.from(pdfUint8Array);

        //         await browser.close();

        //         contentType = "application/pdf";
        //         filename = `${safeTitle}_${dateStr}.pdf`;
        //         break;
        //       }
        case "pdf": {
          const htmlContent = `
    <html>
      <head>
        <title>${reportData.title || "Sustainability Report"}</title>
        <style>
          body {
            font-family: "Segoe UI", Arial, sans-serif;
            margin: 40px;
            background: #f9f9f9;
            color: #333;
          }
          h1 {
            font-size: 28px;
            color: #2c3e50;
            margin-bottom: 40px;
            border-bottom: 2px solid #2ecc71;
            padding-bottom: 10px;
          }
          h2 {
            font-size: 20px;
            color: #27ae60;
            margin-top: 25px;
            margin-bottom: 10px;
          }
          p {
            font-size: 14px;
            line-height: 1.6;
            color: #555;
            margin-bottom: 15px;
          }
          .section {
            background: #fff;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
          }
        </style>
      </head>
      <body>
        <h1>${reportData.title || "Sustainability Report"}</h1>
        ${Object.entries(reportData || {})
          .filter(
            ([key, value]) =>
              key !== "title" && value && String(value).trim() !== ""
          )
          .map(([key, value]) => {
            const label = key
              .replace(/_/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize words
            return `
              <div class="section">
                <h2>${label}</h2>
                <p>${value}</p>
              </div>
            `;
          })
          .join("")}
      </body>
    </html>
  `;

          const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
          });

          const page = await browser.newPage();
          await page.setContent(htmlContent, { waitUntil: "networkidle0" });

          const pdfUint8Array = await page.pdf({
            format: "A4",
            printBackground: true,
          });
          buffer = Buffer.from(pdfUint8Array);

          await browser.close();

          contentType = "application/pdf";
          filename = `${safeTitle}_${dateStr}.pdf`;
          break;
        }

        // case "docx": {
        //   const paragraphs: Paragraph[] = [];

        //   paragraphs.push(
        //     new Paragraph({
        //       children: [
        //         new TextRun({
        //           text: reportData.title || "Sustainability Report",
        //           bold: true,
        //           size: 32,
        //         }),
        //       ],
        //       spacing: { after: 300 },
        //     })
        //   );

        //   for (const [key, value] of Object.entries(reportData)) {
        //     if (key === "title" || !value) continue;

        //     paragraphs.push(
        //       new Paragraph({
        //         children: [new TextRun({ text: key, bold: true, size: 26 })],
        //         spacing: { after: 100 },
        //       }),
        //       new Paragraph({
        //         children: [new TextRun({ text: value, size: 24 })],
        //         spacing: { after: 250 },
        //       })
        //     );
        //   }

        //   const doc = new Document({ sections: [{ children: paragraphs }] });
        //   buffer = await Packer.toBuffer(doc);

        //   contentType =
        //     "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        //   filename = `${safeTitle}_${dateStr}.docx`;
        //   break;
        // }
        case "docx": {
          const paragraphs: Paragraph[] = [];

          // Title - big, bold, greenish color
          paragraphs.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: reportData.title || "Sustainability Report",
                  bold: true,
                  size: 48, // Larger font size for title (24 pt)
                  color: "000000", // SeaGreen color
                }),
              ],
              spacing: { after: 400 },
              alignment: "center",
            })
          );

          // Function to beautify keys (replace _ with space and capitalize)
          const beautifyKey = (key: string) =>
            key
              .replace(/_/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase());

          for (const [key, value] of Object.entries(reportData)) {
            if (key === "title" || !value || String(value).trim() === "")
              continue;

            // Section header with bold and smaller green font
            paragraphs.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: beautifyKey(key),
                    bold: true,
                    size: 32, // 18 pt
                    color: "000000", // ForestGreen
                  }),
                ],
                spacing: { after: 150 },
              })
            );

            // Section content - normal size with indentation
            paragraphs.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: value,
                    size: 24, // 12 pt
                    color: "000000", // Black text
                  }),
                ],
                spacing: { after: 300 },
                indent: { left: 720 }, // Half inch indent (720 twips)
              })
            );
          }

          const doc = new Document({ sections: [{ children: paragraphs }] });
          buffer = await Packer.toBuffer(doc);

          contentType =
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
          filename = `${safeTitle}_${dateStr}.docx`;
          break;
        }

        case "csv": {
          const beautifyKey = (key: string) =>
            key
              .replace(/_/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase());

          const csvData: string[][] = [["Field", "Content"]];

          for (const [key, value] of Object.entries(reportData || {})) {
            if (!value || String(value).trim() === "") continue; // Skip empty values

            csvData.push([beautifyKey(key), value]);
          }

          const csvString = csvData
            .map((row) =>
              row
                .map((cell) => `"${(cell || "").replace(/"/g, '""')}"`)
                .join(",")
            )
            .join("\n");

          buffer = Buffer.from(csvString, "utf-8");
          contentType = "text/csv";
          filename = `${safeTitle}_${dateStr}.csv`;
          break;
        }

        default:
          return res
            .status(400)
            .json({ message: `Unsupported format: ${format}` });
      }
      res.setHeader("Content-Type", contentType);
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}"`
      );
      res.send(buffer);
    } catch (error) {
      console.error("Error exporting report:", error);
      res.status(500).json({ message: "Failed to export report" });
    }
  });

  // Calculate carbon footprint
  app.post("/api/calculate/carbon-footprint", async (req, res) => {
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ message: "Data is required" });
    }

    try {
      const result = calculateCarbonFootprint(data);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to calculate carbon footprint" });
    }
  });

  // Purchase a service - requires authentication
  app.post("/api/purchase-service", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const { serviceName } = req.body;
    if (!serviceName) {
      return res.status(400).json({ message: "Service name is required" });
    }

    try {
      const user = req.user as any;
      const userId = user.id;

      // Get current services
      const existingUser = await storage.getUser(userId);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Add the service to the user's purchased services
      const servicesPurchased = Array.isArray(existingUser.servicesPurchased)
        ? [...existingUser.servicesPurchased]
        : [];

      // Check if service is already purchased
      if (servicesPurchased.includes(serviceName)) {
        return res.status(400).json({ message: "Service already purchased" });
      }

      // Add the service
      servicesPurchased.push(serviceName);

      // Update the user
      const updatedUser = await storage.updateUser(userId, {
        servicesPurchased,
      });

      // Don't return password
      if (updatedUser) {
        const { password, ...userWithoutPassword } = updatedUser;
        return res.json(userWithoutPassword);
      }

      res.status(500).json({ message: "Failed to update user" });
    } catch (error) {
      res.status(500).json({ message: "Failed to purchase service" });
    }
  });

  // Book a consultation - requires authentication
  app.post("/api/book-consultation", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const { serviceName } = req.body;
    if (!serviceName) {
      return res.status(400).json({ message: "Service name is required" });
    }

    try {
      const user = req.user as any;
      const userId = user.id;

      // Get current consultations
      const existingUser = await storage.getUser(userId);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Add the service to the user's booked consultations
      const consultationsBooked = Array.isArray(
        existingUser.consultationsBooked
      )
        ? [...existingUser.consultationsBooked]
        : [];

      // Check if consultation is already booked
      if (consultationsBooked.includes(serviceName)) {
        return res.status(400).json({ message: "Consultation already booked" });
      }

      // Add the consultation
      consultationsBooked.push(serviceName);

      // Update the user
      const updatedUser = await storage.updateUser(userId, {
        consultationsBooked,
      });

      // Don't return password
      if (updatedUser) {
        const { password, ...userWithoutPassword } = updatedUser;
        return res.json(userWithoutPassword);
      }

      res.status(500).json({ message: "Failed to update user" });
    } catch (error) {
      res.status(500).json({ message: "Failed to book consultation" });
    }
  });

  // Get services info - requires authentication
  app.get("/api/services", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // List of available modules in the platform
    const availableServices = [
      {
        id: "report-generator",
        name: "Report Generator",
        type: "paid",
        price: 50,
      },
      {
        id: "sustainability-statement",
        name: "Sustainability Statement Builder",
        type: "paid",
        price: 30,
      },
      {
        id: "ghg-calculator",
        name: "GHG Emissions Calculator",
        type: "paid",
        price: 40,
      },
      {
        id: "benchmarking",
        name: "Industry Benchmarking",
        type: "consultation",
        price: 100,
      },
      {
        id: "compliance",
        name: "Compliance & Certification",
        type: "consultation",
        price: 120,
      },
      {
        id: "esg-rating",
        name: "ESG Rating Calculator",
        type: "paid",
        price: 60,
      },
      {
        id: "product-carbon-footprint",
        name: "Product Carbon Footprint",
        type: "paid",
        price: 45,
      },
      {
        id: "materiality",
        name: "Materiality Assessment",
        type: "consultation",
        price: 90,
      },
    ];

    res.json(availableServices);
  });

  const httpServer = createServer(app);
  return httpServer;
}
