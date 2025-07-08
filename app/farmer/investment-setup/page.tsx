/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, CheckCircle, MapPin, Briefcase, DollarSign, FileText, Target } from 'lucide-react';
import { useRouter } from 'next/navigation';

const FarmerInvestmentSetup = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    cropType: '',
    country: '',
    stateProvince: '',
    cityDistrict: '',
    gpsCoordinates: '',
    farmSize: '',
    landOwnership: '',
    waterSource: '',
    accessRoads: '',
    fundingRequired: '',
    farmingExperience: '',
    harvestTimeline: '',
    expectedYield: '',
    cultivationMethod: '',
    investmentDescription: '',
    marketDistribution: [],
    budgetAllocation: {
      seeds: 15,
      fertilizers: 20,
      labor: 30,
      equipment: 15,
      operational: 10,
      infrastructure: 5,
      insurance: 5
    },
    documents: [],
    agreements: []
  });

  const navigateToDashboard = () => router.push('/farmer/dashboard');

  const steps = [
    { number: 1, title: 'Farm Info', icon: MapPin },
    { number: 2, title: 'Experience', icon: Briefcase },
    { number: 3, title: 'Budget', icon: DollarSign },
    { number: 4, title: 'Documents', icon: FileText },
    { number: 5, title: 'Complete', icon: CheckCircle }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const ProgressIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex flex-col items-center">
            <div className={`
              w-12 h-12 rounded-full border-2 flex items-center justify-center
              ${currentStep >= step.number 
                ? 'bg-black text-white border-black' 
                : 'bg-white text-black border-gray-300'
              }
            `}>
              {currentStep > step.number ? (
                <CheckCircle size={20} />
              ) : (
                <step.icon size={20} />
              )}
            </div>
            <span className="text-xs mt-2 text-center max-w-16">
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={`
              w-16 h-0.5 mx-2 mt-6
              ${currentStep > step.number ? 'bg-black' : 'bg-gray-300'}
            `} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const FarmInfoStep = () => (
    <Card className="w-full max-w-2xl mx-auto border-2 border-black">
      <CardHeader className="text-center border-b border-black">
        <CardTitle className="text-xl font-bold flex items-center justify-center gap-2">
          <MapPin size={24} />
          Farm Information
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Crop Type</label>
            <select className="w-full p-2 border border-black rounded focus:ring-black focus:border-black">
              <option>Select crop type</option>
              <option>Rice</option>
              <option>Corn</option>
              <option>Vegetables</option>
              <option>Fruits</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <select className="w-full p-2 border border-black rounded focus:ring-black focus:border-black">
              <option>Select country</option>
              <option>Indonesia</option>
              <option>Malaysia</option>
              <option>Thailand</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">State/Province</label>
            <Input
              placeholder="Enter state/province"
              className="border-black focus:ring-black focus:border-black"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">City/District</label>
            <Input
              placeholder="Enter city/district"
              className="border-black focus:ring-black focus:border-black"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">GPS Coordinates (Auto-detect)</label>
            <Input
              placeholder="Auto-detected or enter manually"
              className="border-black focus:ring-black focus:border-black"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Farm Size (hectares/acres)</label>
            <Input
              placeholder="Enter farm size"
              className="border-black focus:ring-black focus:border-black"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Land Ownership Status</label>
            <select className="w-full p-2 border border-black rounded focus:ring-black focus:border-black">
              <option>Select ownership status</option>
              <option>Owned</option>
              <option>Leased</option>
              <option>Partnership</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Access Roads</label>
            <select className="w-full p-2 border border-black rounded focus:ring-black focus:border-black">
              <option>Select road condition</option>
              <option>Good</option>
              <option>Fair</option>
              <option>Poor</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Water Source/Irrigation</label>
          <Input
            placeholder="Describe water source and irrigation system"
            className="border-black focus:ring-black focus:border-black"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Funding Required (USD)</label>
          <Input
            placeholder="Enter total funding needed"
            className="border-black focus:ring-black focus:border-black"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Farm Photos (3-5 images)</label>
          <div className="border-2 border-dashed border-black rounded-lg p-8 text-center">
            <Upload size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-sm font-medium mb-2">Drag & drop farm photos here</p>
            <Button variant="outline" className="border-black text-black hover:bg-gray-100">
              Choose Files
            </Button>
          </div>
        </div>
        
        <div className="flex justify-end pt-4">
          <Button 
            onClick={handleNext}
            className="bg-black text-white hover:bg-gray-800 border border-black"
          >
            Next Step →
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const ExperienceStep = () => (
    <Card className="w-full max-w-2xl mx-auto border-2 border-black">
      <CardHeader className="text-center border-b border-black">
        <CardTitle className="text-xl font-bold flex items-center justify-center gap-2">
          <Briefcase size={24} />
          Experience & Cultivation Plan
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Farming Experience</label>
            <select className="w-full p-2 border border-black rounded focus:ring-black focus:border-black">
              <option>Select experience level</option>
              <option>Beginner (0-2 years)</option>
              <option>Intermediate (3-5 years)</option>
              <option>Experienced (5+ years)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Harvest Timeline (months)</label>
            <select className="w-full p-2 border border-black rounded focus:ring-black focus:border-black">
              <option>Select timeline</option>
              <option>3-4 months</option>
              <option>6-8 months</option>
              <option>12+ months</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Expected Yield (tons/kg)</label>
            <Input
              placeholder="Expected yield amount"
              className="border-black focus:ring-black focus:border-black"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Cultivation Method</label>
            <select className="w-full p-2 border border-black rounded focus:ring-black focus:border-black">
              <option>Select cultivation method</option>
              <option>Organic</option>
              <option>Conventional</option>
              <option>Hydroponic</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Market Distribution Plan (multiple selection)</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              'Local markets',
              'Export buyers', 
              'Direct-to-consumer',
              'Cooperatives',
              'Processing industries',
              'Contract farming agreements'
            ].map(option => (
              <label key={option} className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-black" />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Investment Description (max 200 words)</label>
          <textarea
            placeholder="Brief overview of your farming plan, goals, and why investors should support this opportunity..."
            rows={4}
            className="w-full p-2 border border-black rounded focus:ring-black focus:border-black"
          />
        </div>
        
        <div className="flex justify-between pt-4">
          <Button 
            onClick={handlePrevious}
            variant="outline"
            className="border-black text-black hover:bg-gray-100"
          >
            ← Previous
          </Button>
          <Button 
            onClick={handleNext}
            className="bg-black text-white hover:bg-gray-800 border border-black"
          >
            Next Step →
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const BudgetStep = () => (
    <Card className="w-full max-w-2xl mx-auto border-2 border-black">
      <CardHeader className="text-center border-b border-black">
        <CardTitle className="text-xl font-bold flex items-center justify-center gap-2">
          <DollarSign size={24} />
          Budget Allocation
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-3">Financial Breakdown (Auto-calculate percentages)</label>
          <div className="space-y-3">
            {[
              { label: 'Seeds/Seedlings', value: 15, color: 'bg-green-500' },
              { label: 'Fertilizers/Pesticides', value: 20, color: 'bg-blue-500' },
              { label: 'Labor Costs', value: 30, color: 'bg-purple-500' },
              { label: 'Equipment/Tools', value: 15, color: 'bg-orange-500' },
              { label: 'Operational Expenses', value: 10, color: 'bg-red-500' },
              { label: 'Infrastructure/Irrigation', value: 5, color: 'bg-teal-500' },
              { label: 'Insurance & Contingency', value: 5, color: 'bg-yellow-500' }
            ].map(item => (
              <div key={item.label} className="flex items-center space-x-3">
                <div className="w-8">
                  <Input 
                    value={item.value} 
                    className="text-xs p-1 border-black"
                  />
                </div>
                <span className="text-sm">%</span>
                <div className="flex-1 bg-gray-200 rounded h-4">
                  <div 
                    className={`${item.color} h-full rounded`} 
                    style={{ width: `${item.value}%` }}
                  />
                </div>
                <span className="text-sm w-32">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2 bg-gray-100 rounded">
            <span className="text-sm font-medium">Platform Fee (Auto-calculated): 0%</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Budget Validation</label>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-black" />
              <span className="text-sm">Do you have a business bank account? (Yes/No)</span>
            </label>
            
            <div>
              <label className="block text-sm font-medium mb-1">Previous farming loans/credits? (Yes/No/NA)</label>
              <select className="w-full p-2 border border-black rounded">
                <option>Select option</option>
                <option>Yes</option>
                <option>No</option>
                <option>Not Applicable</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Emergency Contact Name & Phone</label>
            <Input
              placeholder="Emergency contact name"
              className="border-black focus:ring-black focus:border-black mb-2"
            />
            <Input
              placeholder="Emergency phone number"
              className="border-black focus:ring-black focus:border-black"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Expected ROI Range</label>
            <Input
              placeholder="Minimum ROI %"
              className="border-black focus:ring-black focus:border-black mb-2"
            />
            <Input
              placeholder="Maximum ROI %"
              className="border-black focus:ring-black focus:border-black"
            />
          </div>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button 
            onClick={handlePrevious}
            variant="outline"
            className="border-black text-black hover:bg-gray-100"
          >
            ← Previous
          </Button>
          <Button 
            onClick={handleNext}
            className="bg-black text-white hover:bg-gray-800 border border-black"
          >
            Next Step →
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const DocumentsStep = () => (
    <Card className="w-full max-w-2xl mx-auto border-2 border-black">
      <CardHeader className="text-center border-b border-black">
        <CardTitle className="text-xl font-bold flex items-center justify-center gap-2">
          <FileText size={24} />
          Documentation & Verification
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Essential Documents</h3>
          <div className="space-y-4">
            <div className="border border-black rounded p-3">
              <div className="flex items-center space-x-2 mb-2">
                <FileText size={16} />
                <span className="font-medium">Land Ownership/Lease Agreement</span>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
                <Upload size={24} className="mx-auto mb-2 text-gray-400" />
                <p className="text-sm">Upload land certificate/title deed or lease agreement</p>
              </div>
            </div>
            
            <div className="border border-black rounded p-3">
              <div className="flex items-center space-x-2 mb-2">
                <FileText size={16} />
                <span className="font-medium">Government Permits (if required)</span>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
                <Upload size={24} className="mx-auto mb-2 text-gray-400" />
                <p className="text-sm">Upload government permits or certifications</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-3">Supporting Evidence (Optional but Recommended)</h3>
          <div className="space-y-4">
            {[
              { icon: '📸', title: 'Previous Harvest Photos' },
              { icon: '🏆', title: 'Agricultural Certifications' },
              { icon: '📄', title: 'Community Endorsement Letter' },
              { icon: '🧪', title: 'Soil Quality Test Results' }
            ].map(item => (
              <div key={item.title} className="border border-gray-300 rounded p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <span>{item.icon}</span>
                  <span className="font-medium">{item.title}</span>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
                  <Upload size={24} className="mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">Upload {item.title.toLowerCase()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-3">Legal Agreements</h3>
          <div className="space-y-2">
            {[
              'I confirm that all provided information is accurate and truthful',
              'I agree to platform Terms & Conditions',
              'I consent to verification site visit',
              'I agree to transparent progress reporting',
              'I understand profit-sharing obligations'
            ].map(agreement => (
              <label key={agreement} className="flex items-start space-x-2">
                <input type="checkbox" className="rounded border-black mt-1" />
                <span className="text-sm">{agreement}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button 
            onClick={handlePrevious}
            variant="outline"
            className="border-black text-black hover:bg-gray-100"
          >
            ← Previous
          </Button>
          <Button 
            onClick={handleNext}
            className="bg-black text-white hover:bg-gray-800 border border-black"
          >
            Submit Investment Setup ✓
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const CompletionStep = () => (
    <Card className="w-full max-w-2xl mx-auto border-2 border-black">
      <CardContent className="p-8 text-center">
        <CheckCircle size={64} className="mx-auto mb-4 text-black" />
        <h2 className="text-2xl font-bold mb-2">Investment Setup Complete!</h2>
        <p className="text-gray-600 mb-6">
          Your farm investment opportunity has been successfully created and submitted for 
          review. Our team will verify your information and make it available to potential investors.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="border border-black rounded p-4">
            <div className="text-2xl mb-2">📅</div>
            <h3 className="font-semibold">Review Process</h3>
            <p className="text-sm text-gray-600">2-3 business days for verification and approval</p>
          </div>
          
          <div className="border border-black rounded p-4">
            <div className="text-2xl mb-2">👥</div>
            <h3 className="font-semibold">Investor Matching</h3>
            <p className="text-sm text-gray-600">Connect with investors interested in your project</p>
          </div>
          
          <div className="border border-black rounded p-4">
            <div className="text-2xl mb-2">📈</div>
            <h3 className="font-semibold">Project Launch</h3>
            <p className="text-sm text-gray-600">Start receiving funding and begin your project</p>
          </div>
        </div>
        
        <div className="text-left bg-gray-50 p-4 rounded border mb-6">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Target size={16} />
            What Happens Next?
          </h3>
          <ul className="text-sm space-y-1 text-gray-600">
            <li>• Document verification and farm inspection (if required)</li>
            <li>• Project listing on Plantify marketplace</li>
            <li>• Investor notifications and matching</li>
            <li>• Funding milestone tracking</li>
            <li>• Regular progress reporting to investors</li>
            <li>• Harvest and profit distribution</li>
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button className="bg-black text-white hover:bg-gray-800 border border-black" onClick={navigateToDashboard}>
            View My Projects
          </Button>
          <Button 
            variant="outline" 
            className="border-black text-black hover:bg-gray-100"
          >
            Create Another Project
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <FarmInfoStep />;
      case 2:
        return <ExperienceStep />;
      case 3:
        return <BudgetStep />;
      case 4:
        return <DocumentsStep />;
      case 5:
        return <CompletionStep />;
      default:
        return <FarmInfoStep />;
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Farm Investment Setup</h1>
        <p className="text-gray-600 text-sm">
          Create your agricultural investment opportunity and connect with investors
        </p>
      </div>

      {/* Progress Indicator */}
      <ProgressIndicator />

      {/* Current Step Content */}
      {renderCurrentStep()}
    </div>
  );
};

export default FarmerInvestmentSetup;