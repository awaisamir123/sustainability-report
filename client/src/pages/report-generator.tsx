import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { TemplateSelection, ReportTemplate } from '@/components/reports/TemplateSelection';
import { REPORT_TEMPLATES } from '@/components/reports/TemplateSelection';
import { ReportEditor } from '@/components/reports/ReportEditor';
import { useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { ArrowRight } from 'lucide-react';

enum GeneratorSteps {
  SELECT_TEMPLATE = 'select-template',
  EDIT_REPORT = 'edit-report'
}

const ReportGenerator: React.FC = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<GeneratorSteps>(GeneratorSteps.SELECT_TEMPLATE);
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null);
  const [location, navigate] = useLocation();
  const { user } = useAuth();
  
  // Handle template selection from URL parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const templateId = searchParams.get('template');
    
    if (templateId) {
      // Find the template with the matching ID
      const template = REPORT_TEMPLATES.find((t: ReportTemplate) => 
        t.frameworkCategory === templateId || 
        t.id === templateId
      );
      
      if (template) {
        setSelectedTemplate(template);
        setCurrentStep(GeneratorSteps.EDIT_REPORT);
      }
    }
  }, [location]);

  // Save report mutation
  const saveReportMutation = useMutation({
    mutationFn: (data: any) => {
      return apiRequest('POST', '/api/reports', {
        organizationId: 1, // Default to first organization
        reportName: data.title,
        reportType: selectedTemplate?.frameworkCategory.toUpperCase() || 'GRI',
        startDate: new Date(data.reportingPeriod.split(' - ')[0]),
        endDate: new Date(data.reportingPeriod.split(' - ')[1]),
        status: 'draft',
        data: data
      });
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Report has been saved successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/reports'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to save report: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  // Handle template selection
  const handleSelectTemplate = (template: ReportTemplate) => {
    setSelectedTemplate(template);
    setCurrentStep(GeneratorSteps.EDIT_REPORT);
  };

  // Handle save report
  const handleSaveReport = (data: any) => {
    saveReportMutation.mutate(data);
  };

  // Handle export report
  const handleExportReport = (format: 'pdf' | 'docx' | 'csv') => {
    // For demonstration purposes, we'll show a toast
    toast({
      title: 'Export requested',
      description: `Report export as ${format.toUpperCase()} has been initiated.`,
    });
    
    // In a real implementation, we would call an API endpoint to generate the export
    // or handle the export on the client side based on the requested format
    if (format === 'csv') {
      // Example of how CSV export might be handled
      setTimeout(() => {
        toast({
          title: 'CSV Export Complete',
          description: 'Your data has been exported to CSV format. Download starting...',
        });
      }, 1500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-teal-700">Sustainability Report Generator</h2>
        </div>
        
        <div className="flex gap-3">
          {currentStep === GeneratorSteps.EDIT_REPORT && (
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(GeneratorSteps.SELECT_TEMPLATE)}
            >
              Change Template
            </Button>
          )}
          
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => user ? navigate('/dashboard') : navigate('/auth')}
          >
            Access Full Sustainability Platform <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {currentStep === GeneratorSteps.SELECT_TEMPLATE && (
        <TemplateSelection onSelectTemplate={handleSelectTemplate} />
      )}

      {currentStep === GeneratorSteps.EDIT_REPORT && selectedTemplate && (
        <ReportEditor
          template={selectedTemplate}
          onBack={() => setCurrentStep(GeneratorSteps.SELECT_TEMPLATE)}
          onSave={handleSaveReport}
          onExport={handleExportReport}
        />
      )}
    </div>
  );
};

export default ReportGenerator;