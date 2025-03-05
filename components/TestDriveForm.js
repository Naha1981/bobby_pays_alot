function TestDriveForm({ onSubmit, onCancel }) {
  try {
    const [formData, setFormData] = React.useState({
      fullName: '',
      email: '',
      phone: '',
      desiredMakeModel: '',
      preferredDate: '',
      preferredTime: '',
      nearestDealership: 'main-branch',
      additionalRequests: ''
    });
    
    const [errors, setErrors] = React.useState({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitted, setSubmitted] = React.useState(false);
    
    // Get today's date in YYYY-MM-DD format for min date
    const today = new Date().toISOString().split('T')[0];
    
    // Get date 30 days from now for max date
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    const maxDateString = maxDate.toISOString().split('T')[0];
    
    const timeSlots = [
      { value: '09:00', label: '09:00 AM' },
      { value: '10:00', label: '10:00 AM' },
      { value: '11:00', label: '11:00 AM' },
      { value: '12:00', label: '12:00 PM' },
      { value: '13:00', label: '01:00 PM' },
      { value: '14:00', label: '02:00 PM' },
      { value: '15:00', label: '03:00 PM' },
      { value: '16:00', label: '04:00 PM' },
      { value: '17:00', label: '05:00 PM' },
    ];
    
    const dealershipLocations = [
      { value: 'main-branch', label: 'Main Branch - Johannesburg' },
      { value: 'cape-town', label: 'Cape Town Branch' },
      { value: 'durban', label: 'Durban Branch' },
      { value: 'pretoria', label: 'Pretoria Branch' }
    ];
    
    const handleChange = (e) => {
      const { id, value } = e.target;
      setFormData({
        ...formData,
        [id]: value
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
      
      if (!formData.desiredMakeModel.trim()) {
        newErrors.desiredMakeModel = 'Vehicle make and model is required';
      }
      
      if (!formData.preferredDate) {
        newErrors.preferredDate = 'Preferred date is required';
      }
      
      if (!formData.preferredTime) {
        newErrors.preferredTime = 'Preferred time is required';
      }
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!validateForm()) {
        return;
      }
      
      setIsSubmitting(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Save data to local storage
        saveFormData('test-drive', formData);
        
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
          <h3 data-name="success-title" className="text-xl font-bold mb-2 text-center">Test Drive Scheduled!</h3>
          <p data-name="success-message" className="text-center">
            Thank you for scheduling a test drive with Mitmak Motors. Our team will confirm your appointment 
            and ensure your selected vehicle is ready when you arrive. You'll receive a confirmation email shortly.
          </p>
        </div>
      );
    }
    
    return (
      <form data-name="test-drive-form" className="form-container" onSubmit={handleSubmit}>
        <h3 data-name="form-title" className="form-title">Schedule a Test Drive</h3>
        
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
          id="desiredMakeModel"
          label="Desired Make/Model"
          value={formData.desiredMakeModel}
          onChange={handleChange}
          placeholder="E.g., Toyota Corolla, BMW 3 Series"
          required={true}
          error={errors.desiredMakeModel}
        />
        
        <div data-name="date-time-row" className="flex flex-col md:flex-row gap-4">
          <div data-name="date-container" className="flex-1">
            <TextField
              id="preferredDate"
              label="Preferred Date"
              type="date"
              value={formData.preferredDate}
              onChange={handleChange}
              min={today}
              max={maxDateString}
              required={true}
              error={errors.preferredDate}
            />
          </div>
          
          <div data-name="time-container" className="flex-1">
            <SelectField
              id="preferredTime"
              label="Preferred Time"
              value={formData.preferredTime}
              onChange={handleChange}
              options={timeSlots}
              required={true}
              error={errors.preferredTime}
            />
          </div>
        </div>
        
        <SelectField
          id="nearestDealership"
          label="Nearest Dealership Location"
          value={formData.nearestDealership}
          onChange={handleChange}
          options={dealershipLocations}
        />
        
        <TextAreaField
          id="additionalRequests"
          label="Additional Requests"
          value={formData.additionalRequests}
          onChange={handleChange}
          placeholder="Any specific requirements or questions about the test drive"
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
            label="Schedule Test Drive"
            isSubmitting={isSubmitting}
          />
        </div>
      </form>
    );
  } catch (error) {
    console.error('TestDriveForm component error:', error);
    reportError(error);
    return null;
  }
}
