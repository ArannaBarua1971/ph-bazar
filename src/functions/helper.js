const date = () => {
  return new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
const toBanglaNumber = (number) =>
  String(number).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[digit]);

const rateValue = (today,yesterday) =>
  Math.abs(((today - yesterday) / yesterday) * 100).toFixed(1);

const validateForm = (data) => {
  if(date.name){
    if (!data.name.trim()) {
      return("Name is required");
    }
  
    if (!/^[a-zA-Z\s]+$/.test(data.name.trim())) {
      return("Name can only contain letters and spaces");
    }
  }

  if (!data.email.trim()) {
    return("Email is required");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return("Please enter a valid email address");
  }

  if (data.password.length < 8) {
    return("Password must be at least 8 characters");
  }

  if (!/[A-Z]/.test(data.password)) {
    return("Password must contain an uppercase letter");
  }

  if (!/[a-z]/.test(data.password)) {
    return ("Password must contain a lowercase letter");
  }

  if (!/[0-9]/.test(data.password)) {
    return("Password must contain a number");
  }

  if (data.password !== data.confirmPassword) {
    return ("Passwords do not match");
  }

  return "";
};
export { date, toBanglaNumber, rateValue,validateForm };
