import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Mock blog posts
const blogPosts = [
  {
    id: 1,
    title: 'How ESG Reporting Drives Business Value',
    excerpt: 'Discover how comprehensive ESG reporting can create tangible business value through improved stakeholder trust, risk management, and operational efficiency.',
    date: 'May 15, 2023',
    author: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    category: 'ESG Strategy',
    readTime: '6 min read'
  },
  {
    id: 2,
    title: 'Carbon Accounting: Best Practices for 2023',
    excerpt: 'A comprehensive guide to carbon accounting methodologies, tools, and strategies that can help organizations accurately measure and report their emissions.',
    date: 'April 28, 2023',
    author: 'Michael Chen',
    image: 'https://images.unsplash.com/photo-1618044619888-009e412ff12a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    category: 'Carbon Management',
    readTime: '8 min read'
  },
  {
    id: 3,
    title: 'Understanding the EU Corporate Sustainability Reporting Directive (CSRD)',
    excerpt: 'An overview of the EU CSRD requirements, timeline, and implications for companies both inside and outside the European Union.',
    date: 'April 12, 2023',
    author: 'Emma Rodrigues',
    image: 'https://images.unsplash.com/photo-1603201667141-5a2d4c673378?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    category: 'Regulations',
    readTime: '7 min read'
  },
  {
    id: 4,
    title: 'The Rise of Science-Based Targets for Nature',
    excerpt: 'How science-based targets are evolving beyond climate to address biodiversity, water, land, and ocean impacts in corporate sustainability strategies.',
    date: 'March 30, 2023',
    author: 'David Park',
    image: 'https://images.unsplash.com/photo-1500829243541-74b677fecc30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    category: 'Biodiversity',
    readTime: '5 min read'
  },
  {
    id: 5,
    title: 'Sustainability Data Management: From Spreadsheets to Specialized Software',
    excerpt: 'The evolution of sustainability data management and why specialized software solutions are becoming essential for accurate and efficient ESG reporting.',
    date: 'March 15, 2023',
    author: 'Alexandra Smith',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    category: 'Technology',
    readTime: '6 min read'
  },
  {
    id: 6,
    title: 'The Investor Perspective: What ESG Information Really Matters',
    excerpt: 'Insights from investment professionals on the ESG metrics and disclosures that influence investment decisions and how companies can align their reporting.',
    date: 'February 28, 2023',
    author: 'Robert Williams',
    image: 'https://images.unsplash.com/photo-1604594849809-dfedbc827105?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    category: 'Investor Relations',
    readTime: '7 min read'
  },
];

// Categories for filter
const categories = [
  'All',
  'ESG Strategy',
  'Carbon Management',
  'Regulations',
  'Technology',
  'Biodiversity',
  'Investor Relations',
];

const Blog: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-neutral-800">Sustainability Insights</h2>
        <p className="text-neutral-500">Expert articles, guides, and resources on sustainability reporting and ESG</p>
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="w-full md:max-w-md">
          <Input placeholder="Search articles..." />
        </div>
        
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={index === 0 ? "default" : "outline"}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Featured Article */}
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="h-64 md:h-auto overflow-hidden">
            <img
              src={blogPosts[0].image}
              alt={blogPosts[0].title}
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          <div className="p-6 flex flex-col justify-between">
            <div>
              <Badge className="mb-2 bg-teal-100 text-teal-800 hover:bg-teal-100">Featured</Badge>
              <Badge className="mb-2 ml-2 bg-blue-100 text-blue-800 hover:bg-blue-100">{blogPosts[0].category}</Badge>
              <h3 className="text-2xl font-bold mb-2">{blogPosts[0].title}</h3>
              <p className="text-gray-600 mb-4">{blogPosts[0].excerpt}</p>
            </div>
            
            <div>
              <div className="flex items-center text-sm mb-4">
                <span className="text-gray-500 mr-3">{blogPosts[0].date}</span>
                <span className="text-gray-500 flex items-center">
                  <span className="material-icons text-[16px] mr-1">schedule</span>
                  {blogPosts[0].readTime}
                </span>
              </div>
              
              <Button>
                Read Article
              </Button>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Latest Articles */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Latest Articles</h3>
          <Button variant="ghost" size="sm">
            View All
            <span className="material-icons ml-1">arrow_forward</span>
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map((post) => (
            <Card key={post.id} className="overflow-hidden flex flex-col h-full">
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              
              <CardContent className="pt-6 flex-grow">
                <Badge className="mb-2 bg-blue-100 text-blue-800 hover:bg-blue-100">{post.category}</Badge>
                <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm">{post.excerpt}</p>
              </CardContent>
              
              <CardFooter className="flex items-center justify-between border-t pt-4">
                <div className="flex items-center text-sm">
                  <span className="text-gray-500 mr-3">{post.date}</span>
                  <span className="text-gray-500 flex items-center">
                    <span className="material-icons text-[16px] mr-1">schedule</span>
                    {post.readTime}
                  </span>
                </div>
                
                <Button variant="ghost" size="sm" className="p-0">
                  Read More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Newsletter */}
      <Card className="bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xl font-bold mb-2">Stay updated with sustainability insights</h3>
              <p className="text-teal-100 mb-4">Subscribe to our newsletter for the latest articles, guides, and resources on sustainability reporting and ESG practices.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Input 
                placeholder="Enter your email" 
                className="bg-white/10 border-white/20 placeholder:text-white/70 text-white" 
              />
              <Button className="bg-white text-teal-800 hover:bg-teal-100 whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Topics */}
      <div>
        <h3 className="text-xl font-bold mb-4">Popular Topics</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="overflow-hidden">
            <div className="h-32 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
                alt="ESG Reporting"
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            <CardContent className="pt-4">
              <h4 className="font-bold text-center">ESG Reporting</h4>
              <p className="text-gray-500 text-sm text-center">12 articles</p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden">
            <div className="h-32 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1618044619888-009e412ff12a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
                alt="Carbon Accounting"
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            <CardContent className="pt-4">
              <h4 className="font-bold text-center">Carbon Accounting</h4>
              <p className="text-gray-500 text-sm text-center">8 articles</p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden">
            <div className="h-32 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1603201667141-5a2d4c673378?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
                alt="Regulations"
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            <CardContent className="pt-4">
              <h4 className="font-bold text-center">Regulations</h4>
              <p className="text-gray-500 text-sm text-center">15 articles</p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden">
            <div className="h-32 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
                alt="Technology"
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            <CardContent className="pt-4">
              <h4 className="font-bold text-center">Technology</h4>
              <p className="text-gray-500 text-sm text-center">10 articles</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Blog;