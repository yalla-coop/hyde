import xss from 'xss';

const detectAndBlockXSS = (req, res, next) => {
  // Function to sanitize and detect XSS
  const containsXSS = (value) => {
    // Basic detection: checks if sanitized output differs from input
    return value !== xss(value);
  };

  // Check for XSS in request body, query, and headers
  const checkXSSInObject = (obj) => {
    if (!obj || typeof obj !== 'object') return false;
    return Object.values(obj).some((value) => {
      if (typeof value === 'string' && containsXSS(value)) return true;
      if (typeof value === 'object') return checkXSSInObject(value); // Recursively check nested objects
      return false;
    });
  };

  if (
    checkXSSInObject(req.body) ||
    checkXSSInObject(req.query) ||
    checkXSSInObject(req.headers)
  ) {
    return res.status(400).json({
      message: 'Suspicious activity detected. Your request was rejected.',
    });
  }

  next();
};

export default detectAndBlockXSS;
