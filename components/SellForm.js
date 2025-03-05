function SellForm({ onSubmit, onCancel }) {
  try {
    const [formData, setFormData] = React.useState({
      fullName: '',
      email: '',
      phone: '',
      makeModel: '',
      year: '',
      mileage: '',
      condition: '',
      askingPrice: '',
      modifications: '',
      photoFile: null,
      photoFileName: ''
    });
    
    const [errors, setErrors] = React.useState({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitted, setSubmitted] = React.useState(false);
    
    const conditionOptions = [
      { value: 'excellent', label: 'Excellent - Like New' },
      { value: 'very-good', label: 'Very Good - Minor Wear' },
      { value: 'good', label: 'Good - Normal Wear for Age' },
      { value: 'fair', label: 'Fair - Some Mechanical/Cosmetic Issues' },
      { value: 'poor', label: 'Poor - Significant Issues' }
    ];
    
    const handleChange = (e) => {
      const { id, value, type, checked } = e.target;
      
      if (type === 'file') {
        const file = e.target.files[0];
        if (file) {
          setFormData({
            ...formData,
            photoFile: file,
            photoFileName: file.name
          });
        }
      } else {
        setFormData({
          ...formData,
          [id]: type === 'checkbox' ? checked : value
        });
      }
      
      // Clear error when field is edited
      if (errors[id]) {
        setErrors({
          ...errors,
          [id]: ''
        });
      }
    };
    
    const validateForm = () => {
      const newErrors = {};
      
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!validateField('email', formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!validateField('phone', formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
      
      if (!formData.makeModel.trim()) {
        newErrors.makeModel = 'Vehicle make and model is required';
      }
      
      if (!formData.year.trim()) {
        newErrors.year = 'Year is required';
      } else if (isNaN(formData.year) || parseInt(formData.year) < 1900 || parseInt(formData.year) > new Date().getFullYear()) {
        newErrors.year = 'Please enter a valid year';
      }
      
      if (!formData.mileage.trim()) {
        newErrors.mileage = 'Mileage is required';
      } else if (isNaN(formData.mileage) || parseInt(formData.mileage) < 0) {
        newErrors.mileage = 'Please enter a valid mileage';
      }
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    
    const sendToWebhook = async (data) => {
      try {
        const webhookUrl = 'https://hook.us1.make.com/ceke4nr7c2sxaswbukchdrcc2bp48ri5';
        
        // Add timestamp and form type
        const webhookData = {
          ...data,
          formType: 'sell',
          submittedAt: new Date().toISOString()
        };
        
        // Remove file object as it can't be serialized
        if (webhookData.photoFile) {
          delete webhookData.photoFile;
        }
        
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookData)
        });
        
        if (!response.ok) {
          throw new Error('Webhook submission failed');
        }
        
        return true;
      } catch (error) {
        console.error('Error sending data to webhook:', error);
        return false;
      }
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!validateForm()) {
        return;
      }
      
      setIsSubmitting(true);
      
      try {
        // Send data to webhook
        await sendToWebhook(formData);
        
        // Save data to local storage (excluding file object)
        const dataToSave = { ...formData };
        delete dataToSave.photoFile;
        saveFormData('sell', dataToSave);
        
        setSubmitted(true);
        setIsSubmitting(false);
        
        // Notify parent component
        if (onSubmit) {
          onSubmit(formData);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setIsSubmitting(false);
        setErrors({
          ...errors,
          form: 'There was an error submitting your form. Please try again.'
        });
      }
    };
    
    if (submitted) {
      return (
        <div data-name="form-success" className="form-success">
          <div data-name="success-icon" className="text-center mb-4">
            <i className="fas fa-check-circle text-4xl text-green-500"></i>
          </div>
          <h3 data-name="success-title" className="text-xl font-bold mb-2 text-center">Form Submitted Successfully!</h3>
          <p data-name="success-message" className="text-center">
            Thank you for providing details about your vehicle! Our appraisal team will evaluate the information 
            and contact you within 24-48 hours with a preliminary valuation.
          </p>
        </div>
      );
    }
    
    return (
      <form data-name="sell-form" className="form-container" onSubmit={handleSubmit}>
        <h3 data-name="form-title" className="form-title">Vehicle Selling Information</h3>
        
        <TextField
          id="fullName"
          label="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          required={true}
          error={errors.fullName}
        />
        
        <TextField
          id="email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          required={true}
          error={errors.email}
        />
        
        <TextField
          id="phone"
          label="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          required={true}
          error={errors.phone}
        />
        
        <TextField
          id="makeModel"
          label="Vehicle Make/Model"
          value={formData.makeModel}
          onChange={handleChange}
          placeholder="E.g., Toyota Corolla, BMW 3 Series"
          required={true}
          error={errors.makeModel}
        />
        
        <TextField
          id="year"
          label="Year of Manufacture"
          value={formData.year}
          onChange={handleChange}
          placeholder="E.g., 2018"
          required={true}
          error={errors.year}
        />
        
        <TextField
          id="mileage"
          label="Mileage (km)"
          value={formData.mileage}
          onChange={handleChange}
          placeholder="E.g., 75000"
          required={true}
          error={errors.mileage}
        />
        
        <SelectField
          id="condition"
          label="Vehicle Condition"
          value={formData.condition}
          onChange={handleChange}
          options={conditionOptions}
        />
        
        <TextField
          id="askingPrice"
          label="Asking Price (R)"
          value={formData.askingPrice}
          onChange={handleChange}
          placeholder="E.g., 120000"
        />
        
        <TextAreaField
          id="modifications"
          label="Modifications or Repairs Needed"
          value={formData.modifications}
          onChange={handleChange}
          placeholder="Please describe any modifications made to the vehicle or repairs needed"
        />
        
        <FileField
          id="photoFile"
          label="Upload Vehicle Photo"
          onChange={handleChange}
          fileName={formData.photoFileName}
        />
        
        {errors.form && <div data-name="form-error" className="form-error mb-4">{errors.form}</div>}
        
        <div data-name="form-actions" className="flex justify-between mt-6">
          <button
            data-name="cancel-button"
            type="button"
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white transition-colors"
            onClick={onCancel}
          >
            Cancel
          </button>
          <SubmitButton
            label="Submit Vehicle Details"
            isSubmitting={isSubmitting}
          />
        </div>
      </form>
    );
  } catch (error) {
    console.error('SellForm component error:', error);
    reportError(error);
    return null;
  }
}
