export const calculateAge = (dob, ageLimitDate) => {
  // Parse the dates
  const birthDate = new Date(dob);
  const limitDate = new Date(ageLimitDate);
  
  // Calculate difference in years
  let age = limitDate.getFullYear() - birthDate.getFullYear();
  
  // Adjust if birthday hasn't occurred yet in the limit year
  const monthDiff = limitDate.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && limitDate.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};