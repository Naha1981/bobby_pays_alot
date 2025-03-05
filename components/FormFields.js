function TextField({ id, label, value, onChange, type = "text", placeholder = "", required = false, error = "" }) {
  try {
    return (
      <div data-name="form-group" className="form-group">
        <label data-name="form-label" htmlFor={id} className="form-label">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        <input
          data-name="form-input"
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="form-input"
          required={required}
        />
        {error && <div data-name="form-error" className="form-error">{error}</div>}
      </div>
    );
  } catch (error) {
    console.error('TextField component error:', error);
    reportError(error);
    return null;
  }
}

function TextAreaField({ id, label, value, onChange, placeholder = "", required = false, error = "" }) {
  try {
    return (
      <div data-name="form-group" className="form-group">
        <label data-name="form-label" htmlFor={id} className="form-label">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        <textarea
          data-name="form-textarea"
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="form-textarea"
          required={required}
        />
        {error && <div data-name="form-error" className="form-error">{error}</div>}
      </div>
    );
  } catch (error) {
    console.error('TextAreaField component error:', error);
    reportError(error);
    return null;
  }
}

function SelectField({ id, label, value, onChange, options, required = false, error = "" }) {
  try {
    return (
      <div data-name="form-group" className="form-group">
        <label data-name="form-label" htmlFor={id} className="form-label">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        <select
          data-name="form-select"
          id={id}
          value={value}
          onChange={onChange}
          className="form-select"
          required={required}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <div data-name="form-error" className="form-error">{error}</div>}
      </div>
    );
  } catch (error) {
    console.error('SelectField component error:', error);
    reportError(error);
    return null;
  }
}

function CheckboxField({ id, label, checked, onChange, error = "" }) {
  try {
    return (
      <div data-name="form-checkbox-group" className="form-checkbox-group">
        <input
          data-name="form-checkbox"
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="form-checkbox"
        />
        <label data-name="form-checkbox-label" htmlFor={id} className="form-checkbox-label">
          {label}
        </label>
        {error && <div data-name="form-error" className="form-error ml-2">{error}</div>}
      </div>
    );
  } catch (error) {
    console.error('CheckboxField component error:', error);
    reportError(error);
    return null;
  }
}

function FileField({ id, label, onChange, fileName = "", error = "" }) {
  try {
    return (
      <div data-name="form-group" className="form-group">
        <label data-name="form-label" htmlFor={id} className="form-label">
          {label}
        </label>
        <div data-name="file-input-container" className="file-input-container">
          <label data-name="file-input-label" className="file-input-label">
            <i className="fas fa-upload mr-2"></i> Choose File
            <input
              data-name="file-input"
              id={id}
              type="file"
              onChange={onChange}
              className="file-input"
              accept="image/*"
            />
          </label>
        </div>
        {fileName && (
          <div data-name="file-name" className="file-name">
            <i className="fas fa-file mr-1"></i> {fileName}
          </div>
        )}
        {error && <div data-name="form-error" className="form-error">{error}</div>}
      </div>
    );
  } catch (error) {
    console.error('FileField component error:', error);
    reportError(error);
    return null;
  }
}

function SubmitButton({ label, isSubmitting, onClick }) {
  try {
    return (
      <button
        data-name="form-submit"
        type="submit"
        className="form-submit mt-4"
        disabled={isSubmitting}
        onClick={onClick}
      >
        {isSubmitting ? (
          <div data-name="button-loading" className="flex items-center justify-center">
            <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
            Submitting...
          </div>
        ) : (
          label
        )}
      </button>
    );
  } catch (error) {
    console.error('SubmitButton component error:', error);
    reportError(error);
    return null;
  }
}
