/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, CheckCircle, MapPin, Briefcase, DollarSign, FileText, Target, Loader2, AlertCircle, X } from 'lucide-react';
import { useInvestmentSetupForm } from './handlers';

const FarmerInvestmentSetup = () => {
  const {
    // State
    currentStep,
    loading,
    error,
    success,
    formData,
    fileInputRef,

    // Utility functions
    getCropTypeFromString,
    getLandOwnershipFromString,
    getAccessRoadFromString,
    getExperienceLevelFromString,
    getHarvestTimelineFromString,
    getCultivationMethodFromString,
    getMarketDistributionOption,
    isEqualMarketDistribution,

    // Form handlers
    handleInputChange,
    handleBudgetChange,
    handleAgreementChange,
    handleMarketDistributionChange,
    handlePhotoUpload,
    handleRemovePhoto,
    handleDragOver,
    handleDrop,

    // Navigation
    handleNext,
    handlePrevious,
    navigateToDashboard,

    // Form submission
    handleSubmit,

    // Validation
    validateStep,
  } = useInvestmentSetupForm();

  const steps = [
    { number: 1, title: 'Farm Info', icon: MapPin },
    { number: 2, title: 'Experience', icon: Briefcase },
    { number: 3, title: 'Budget', icon: DollarSign },
    { number: 4, title: 'Documents', icon: FileText },
    { number: 5, title: 'Complete', icon: CheckCircle }
  ];

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

  const FarmInfoStep = useMemo(() => (
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
            <label className="block text-sm font-medium mb-1">Crop Type *</label>
            <select 
              className="w-full p-2 border border-black rounded focus:ring-black focus:border-black"
              value={formData.cropType ? Object.keys(formData.cropType)[0] : ''}
              onChange={(e) => handleInputChange('cropType', getCropTypeFromString(e.target.value))}
            >
              <option value="">Select crop type</option>
              <option value="Rice">Rice</option>
              <option value="Corn">Corn</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Coffee">Coffee</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Country *</label>
            <select 
              className="w-full p-2 border border-black rounded focus:ring-black focus:border-black"
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
            >
              <option value="">Select country</option>
              <option value="Indonesia">Indonesia</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Thailand">Thailand</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">State/Province *</label>
            <Input
              placeholder="Enter state/province"
              className="border-black focus:ring-black focus:border-black"
              value={formData.stateProvince}
              onChange={(e) => handleInputChange('stateProvince', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">City/District *</label>
            <Input
              placeholder="Enter city/district"
              className="border-black focus:ring-black focus:border-black"
              value={formData.cityDistrict}
              onChange={(e) => handleInputChange('cityDistrict', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">GPS Coordinates (Optional)</label>
            <Input
              placeholder="Auto-detected or enter manually"
              className="border-black focus:ring-black focus:border-black"
              value={formData.gpsCoordinates}
              onChange={(e) => handleInputChange('gpsCoordinates', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Farm Size *</label>
            <Input
              placeholder="Enter farm size (e.g., 5.5 hectares)"
              className="border-black focus:ring-black focus:border-black"
              value={formData.farmSize}
              onChange={(e) => handleInputChange('farmSize', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Land Ownership Status *</label>
            <select 
              className="w-full p-2 border border-black rounded focus:ring-black focus:border-black"
              value={formData.landOwnership ? Object.keys(formData.landOwnership)[0] : ''}
              onChange={(e) => handleInputChange('landOwnership', getLandOwnershipFromString(e.target.value))}
            >
              <option value="">Select ownership status</option>
              <option value="Owned">Owned</option>
              <option value="Leased">Leased</option>
              <option value="Partnership">Partnership</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Access Roads *</label>
            <select 
              className="w-full p-2 border border-black rounded focus:ring-black focus:border-black"
              value={formData.accessRoads ? Object.keys(formData.accessRoads)[0] : ''}
              onChange={(e) => handleInputChange('accessRoads', getAccessRoadFromString(e.target.value))}
            >
              <option value="">Select road condition</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Water Source/Irrigation *</label>
          <Input
            placeholder="Describe water source and irrigation system"
            className="border-black focus:ring-black focus:border-black"
            value={formData.waterSource}
            onChange={(e) => handleInputChange('waterSource', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Funding Required (USD) *</label>
          <Input
            placeholder="Enter total funding needed"
            className="border-black focus:ring-black focus:border-black"
            value={formData.fundingRequired}
            onChange={(e) => handleInputChange('fundingRequired', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Farm Photos (3-5 images)</label>
          <div 
            className="border-2 border-dashed border-black rounded-lg p-8 text-center cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <Upload size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-sm font-medium mb-2">Drag & drop farm photos here</p>
            <Button 
              variant="outline" 
              className="border-black text-black hover:bg-gray-100"
              onClick={() => fileInputRef.current?.click()}
              type="button"
            >
              Choose Files
            </Button>
            <input 
              ref={fileInputRef}
              type="file" 
              multiple 
              accept="image/*" 
              onChange={(e) => handlePhotoUpload(e.target.files)} 
              className="hidden"
            />
          </div>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {formData.farmPhotos.map((photo, index) => (
              <div key={index} className="relative group">
                <img 
                  src={URL.createObjectURL(photo)} 
                  alt={`Farm photo ${index + 1}`} 
                  className="w-full h-24 object-cover rounded-md"
                />
                <button 
                  onClick={() => handleRemovePhoto(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove photo"
                  type="button"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
          {formData.farmPhotos.length > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              {formData.farmPhotos.length} of 3-5 photos uploaded
            </p>
          )}
          {formData.farmPhotos.length < 3 && (
            <p className="text-sm text-red-600 mt-2">
              Please upload at least 3 photos (currently {formData.farmPhotos.length})
            </p>
          )}
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
  ), [formData, handleInputChange, handleNext, handlePhotoUpload, handleRemovePhoto, handleDragOver, handleDrop, fileInputRef, getCropTypeFromString, getLandOwnershipFromString, getAccessRoadFromString]);

  const ExperienceStep = useMemo(() => (
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
            <label className="block text-sm font-medium mb-1">Farming Experience *</label>
            <select 
              className="w-full p-2 border border-black rounded focus:ring-black focus:border-black"
              value={formData.farmingExperience ? Object.keys(formData.farmingExperience)[0] : ''}
              onChange={(e) => handleInputChange('farmingExperience', getExperienceLevelFromString(e.target.value))}
            >
              <option value="">Select experience level</option>
              <option value="Beginner">Beginner (0-2 years)</option>
              <option value="Intermediate">Intermediate (3-5 years)</option>
              <option value="Experienced">Experienced (5+ years)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Harvest Timeline *</label>
            <select 
              className="w-full p-2 border border-black rounded focus:ring-black focus:border-black"
              value={formData.harvestTimeline ? Object.keys(formData.harvestTimeline)[0] : ''}
              onChange={(e) => handleInputChange('harvestTimeline', getHarvestTimelineFromString(e.target.value))}
            >
              <option value="">Select timeline</option>
              <option value="Short">3-4 months</option>
              <option value="Medium">6-8 months</option>
              <option value="Long">12+ months</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Expected Yield *</label>
            <Input
              placeholder="Expected yield amount (e.g., 7 tons per hectare)"
              className="border-black focus:ring-black focus:border-black"
              value={formData.expectedYield}
              onChange={(e) => handleInputChange('expectedYield', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Cultivation Method *</label>
            <select 
              className="w-full p-2 border border-black rounded focus:ring-black focus:border-black"
              value={formData.cultivationMethod ? Object.keys(formData.cultivationMethod)[0] : ''}
              onChange={(e) => handleInputChange('cultivationMethod', getCultivationMethodFromString(e.target.value))}
            >
              <option value="">Select cultivation method</option>
              <option value="Organic">Organic</option>
              <option value="Conventional">Conventional</option>
              <option value="Hydroponic">Hydroponic</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Market Distribution Plan * (Select at least one)</label>
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
                <input 
                  type="checkbox" 
                  className="rounded border-black" 
                  checked={formData.marketDistribution.some(item => isEqualMarketDistribution(item, getMarketDistributionOption(option)!))}
                  onChange={(e) => handleMarketDistributionChange(option, e.target.checked)}
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Investment Description * (max 200 words)</label>
          <textarea
            placeholder="Brief overview of your farming plan, goals, and why investors should support this opportunity..."
            rows={4}
            className="w-full p-2 border border-black rounded focus:ring-black focus:border-black"
            value={formData.investmentDescription}
            onChange={(e) => handleInputChange('investmentDescription', e.target.value)}
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
  ), [formData, handleInputChange, handleNext, handlePrevious, handleMarketDistributionChange, getExperienceLevelFromString, getHarvestTimelineFromString, getCultivationMethodFromString, isEqualMarketDistribution, getMarketDistributionOption]);

  const BudgetStep = useMemo(() => (
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
              { key: 'seeds', label: 'Seeds/Seedlings', color: 'bg-green-500' },
              { key: 'fertilizers', label: 'Fertilizers/Pesticides', color: 'bg-blue-500' },
              { key: 'labor', label: 'Labor Costs', color: 'bg-purple-500' },
              { key: 'equipment', label: 'Equipment/Tools', color: 'bg-orange-500' },
              { key: 'operational', label: 'Operational Expenses', color: 'bg-red-500' },
              { key: 'infrastructure', label: 'Infrastructure/Irrigation', color: 'bg-teal-500' },
              { key: 'insurance', label: 'Insurance & Contingency', color: 'bg-yellow-500' }
            ].map(item => (
              <div key={item.key} className="flex items-center space-x-3">
                <div className="w-8">
                  <Input 
                    value={formData.budgetAllocation[item.key as keyof typeof formData.budgetAllocation]} 
                    className="text-xs p-1 border-black"
                    onChange={(e) => handleBudgetChange(item.key, parseInt(e.target.value) || 0)}
                  />
                </div>
                <span className="text-sm">%</span>
                <div className="flex-1 bg-gray-200 rounded h-4">
                  <div 
                    className={`${item.color} h-full rounded`} 
                    style={{ width: `${formData.budgetAllocation[item.key as keyof typeof formData.budgetAllocation]}%` }}
                  />
                </div>
                <span className="text-sm w-32">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2 bg-gray-100 rounded">
            <span className="text-sm font-medium">
              Total: {Object.values(formData.budgetAllocation).reduce((sum, val) => sum + val, 0)}%
            </span>
            {Object.values(formData.budgetAllocation).reduce((sum, val) => sum + val, 0) !== 100 && (
              <span className="text-red-500 text-xs ml-2">
                (Budget must total 100%)
              </span>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Budget Validation</label>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                className="rounded border-black" 
                checked={formData.hasBusinessBankAccount}
                onChange={(e) => handleInputChange('hasBusinessBankAccount', e.target.checked)}
              />
              <span className="text-sm">Do you have a business bank account?</span>
            </label>
            
            <div>
              <label className="block text-sm font-medium mb-1">Previous farming loans/credits?</label>
              <select 
                className="w-full p-2 border border-black rounded"
                value={formData.previousFarmingLoans === null ? '' : formData.previousFarmingLoans ? 'Yes' : 'No'}
                onChange={(e) => {
                  const value = e.target.value;
                  handleInputChange('previousFarmingLoans', value === 'Yes' ? true : value === 'No' ? false : null);
                }}
              >
                <option value="">Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Emergency Contact</label>
            <Input
              placeholder="Emergency contact name"
              className="border-black focus:ring-black focus:border-black mb-2"
              value={formData.emergencyContactName}
              onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
            />
            <Input
              placeholder="Emergency phone number"
              className="border-black focus:ring-black focus:border-black"
              value={formData.emergencyContactPhone}
              onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Expected ROI Range</label>
            <Input
              placeholder="Minimum ROI %"
              className="border-black focus:ring-black focus:border-black mb-2"
              value={formData.expectedMinROI}
              onChange={(e) => handleInputChange('expectedMinROI', e.target.value)}
            />
            <Input
              placeholder="Maximum ROI %"
              className="border-black focus:ring-black focus:border-black"
              value={formData.expectedMaxROI}
              onChange={(e) => handleInputChange('expectedMaxROI', e.target.value)}
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
  ), [formData, handleInputChange, handleBudgetChange, handleNext, handlePrevious]);

  const DocumentsStep = useMemo(() => (
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
            ].map((agreement, index) => (
              <label key={agreement} className="flex items-start space-x-2">
                <input 
                  type="checkbox" 
                  className="rounded border-black mt-1" 
                  checked={formData.agreements[index]}
                  onChange={(e) => handleAgreementChange(index, e.target.checked)}
                />
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
            onClick={handleSubmit}
            className="bg-black text-white hover:bg-gray-800 border border-black"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Investment Setup ✓'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  ), [formData.agreements, handleAgreementChange, handlePrevious, handleSubmit, loading]);

  const CompletionStep = useMemo(() => (
    <Card className="w-full max-w-2xl mx-auto border-2 border-black">
      <CardContent className="p-8 text-center">
        <CheckCircle size={64} className="mx-auto mb-4 text-black" />
        <h2 className="text-2xl font-bold mb-2">
          {success ? 'Investment Setup Complete!' : 'Ready to Submit!'}
        </h2>
        <p className="text-gray-600 mb-6">
          {success 
            ? 'Your farm investment opportunity has been successfully created and submitted for review. Our team will verify your information and make it available to potential investors.'
            : 'Please review your information below and submit your investment setup when ready.'
          }
        </p>
        
        {/* Summary of submitted data */}
        {!success && (
          <div className="text-left bg-gray-50 p-4 rounded border mb-6">
            <h3 className="font-semibold mb-2">Investment Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Crop Type:</strong> {formData.cropType ? Object.keys(formData.cropType)[0] : 'Not selected'}</p>
                <p><strong>Location:</strong> {formData.cityDistrict}, {formData.stateProvince}</p>
                <p><strong>Farm Size:</strong> {formData.farmSize}</p>
                <p><strong>Funding Required:</strong> ${formData.fundingRequired}</p>
              </div>
              <div>
                <p><strong>Experience Level:</strong> {formData.farmingExperience ? Object.keys(formData.farmingExperience)[0] : 'Not selected'}</p>
                <p><strong>Cultivation Method:</strong> {formData.cultivationMethod ? Object.keys(formData.cultivationMethod)[0] : 'Not selected'}</p>
                <p><strong>Expected ROI:</strong> {formData.expectedMinROI}% - {formData.expectedMaxROI}%</p>
                <p><strong>Market Distribution:</strong> {formData.marketDistribution.length} option(s) selected</p>
              </div>
            </div>
          </div>
        )}
        
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
          {success ? (
            <>
              <Button className="bg-black text-white hover:bg-gray-800 border border-black" onClick={navigateToDashboard}>
                View My Projects
              </Button>
              <Button 
                variant="outline" 
                className="border-black text-black hover:bg-gray-100"
                onClick={() => window.location.reload()}
              >
                Create Another Project
              </Button>
            </>
          ) : (
            <>
              <Button 
                onClick={handlePrevious}
                variant="outline"
                className="border-black text-black hover:bg-gray-100"
              >
                ← Back to Review
              </Button>
              <Button 
                onClick={handleSubmit}
                className="bg-black text-white hover:bg-gray-800 border border-black"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Investment Setup ✓'
                )}
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  ), [success, formData, navigateToDashboard, handlePrevious, handleSubmit, loading]);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return FarmInfoStep;
      case 2:
        return ExperienceStep;
      case 3:
        return BudgetStep;
      case 4:
        return DocumentsStep;
      case 5:
        return CompletionStep;
      default:
        return FarmInfoStep;
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

      {/* Error/Success Messages */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-md flex items-center">
          <AlertCircle className="mr-2 h-5 w-5" />
          {error}
        </div>
      )}
      {success && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md flex items-center">
          <CheckCircle className="mr-2 h-5 w-5" />
          Investment setup submitted successfully!
        </div>
      )}
    </div>
  );
};

export default FarmerInvestmentSetup;