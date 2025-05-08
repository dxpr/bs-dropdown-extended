// This file is for testing ESLint and Husky

function  badlyFormattedFunction( arg1,arg2){
console.log('This should trigger a console error and formatting issues.');
    const unUsedVar = 5;
  return arg1+arg2;
}

export default badlyFormattedFunction; 