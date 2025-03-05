function BuyForm({ onSubmit, onCancel }) {
  try {
    const [formData, setFormData] = React.useState({
      fullName: '',
      email: '',
      phone: '',
      preferredMakeModel: '',
      budgetRange: '',
      preferredFeatures: '',
      testDriveInterest: false,
      additionalComments: ''
    });
    
    const [errors, setErrors] = React.useState({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitted, setSubmitted] = React.useState(false);
    
    const budgetOptions = [
      { value: 'under-100k', label: 'Under R100,000' },
      { value: '100k-200k', label: 'R100,000 - R200,000' },
      { value: '200k-300k', label: 'R200,000 - R300,000' },
      { value: '300k-400k', label: 'R300,000 - R400,000' },
      { value: '400k-500k', label: 'R400,000 - R500,000' },
      { value: 'above-500k', label: 'Above R500,000' }
    ];
    
    const handleChange = (e) => {
      const { id, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [id]: type === 'checkbox' ? checked : value
      });
      
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
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    
    const sendToWebhook = async (data) => {
      try {
        const webhookUrl = 'https://hook.us1.make.com/pitpevt7fsr6coww8c4pbl1u65q59egf';
        
        // Add timestamp and form type
        const webhookData = {
          ...data,
          formType: 'buy',
          submittedAt: new Date().toISOString()
        };
        
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
        
        // Save data to local storage
        saveFormData('buy', formData);
        
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
            Thank you for your interest in purchasing a vehicle from Mitmak Motors. 
            Our team will review your preferences and contact you shortly.
          </p>
        </div>
      );
    }
    
    return (
      <form data-name="buy-form" className="form-container" onSubmit={handleSubmit}>
        <h3 data-name="form-title" className="form-title">Vehicle Purchase Inquiry</h3>
        
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
          id="preferredMakeModel"
          label="Preferred Make/Model"
          value={formData.preferredMakeModel}
          onChange={handleChange}
          placeholder="E.g., Toyota Corolla, BMW 3 Series"
        />
        
        <SelectField
          id="budgetRange"
          label="Budget Range"
          value={formData.budgetRange}
          onChange={handleChange}
          options={budgetOptions}
        />
        
        <TextAreaField
          id="preferredFeatures"
          label="Preferred Features"
          value={formData.preferredFeatures}
          onChange={handleChange}
          placeholder="E.g., leather seats, sunroof, navigation system"
        />
        
        <CheckboxField
          id="testDriveInterest"
          label="I'm interested in scheduling a test drive"
          checked={formData.testDriveInterest}
          onChange={handleChange}
        />
        
        <TextAreaField
          id="additionalComments"
          label="Additional Comments"
          value={formData.additionalComments}
          onChange={handleChange}
          placeholder="Any additional information or requirements"
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
            label="Submit Inquiry"
            isSubmitting={isSubmitting}
          />
        </div>
      </form>
    );
  } catch (error) {
    console.error('BuyForm component error:', error);
    reportError(error);
    return null;
  }
}
