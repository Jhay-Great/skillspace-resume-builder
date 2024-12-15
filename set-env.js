const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

// Define the environment file path
const targetPath = 'src/environments/environment.development.ts';
// Create the environment file content

const args = process.argv.slice(2);
args.forEach((arg) => {
const [key, value] = arg.split('=');
if (key && value) {
 process.env[key] = value;
}
})


const envConfigFile =`export const environment = {
  production: ${process.env['NODE_ENV'] === 'production'} || '',

    COMPANY_PROGRAMMES_BASE_API: ${process.env['COMPANY_PROGRAMMES_BASE_API']} || '',
    NEW_ADDRESS: ${process.env['NEW_ADDRESS']} || '',
    AUTH_ADDRESS: ${process.env['AUTH_ADDRESS']} || '',
    BASE_API: ${process.env['BASE_API']} || '',
    AUTH_PORT: ${process.env['AUTH_PORT']} || '',
    SERVICE_PORT: ${process.env['SERVICE_PORT']} || '',
    COMPANY_ENDPOINT: ${process.env['COMPANY_ENDPOINT']} || '',
    TALENT_ENDPOINT: ${process.env['TALENT_ENDPOINT']} || '',
    OTP_ENDPOINT: ${process.env['OTP_ENDPOINT']} || '',
    FORGOT_PASSWORD_ENDPOINT: ${process.env['FORGOT_PASSWORD_ENDPOINT']} || '',
    OTP_BASE_API: ${process.env['OTP_BASE_API']} || '',
    ALL_COMPANIES: ${process.env['ALL_COMPANIES']} || '',
    APPROVAL_ENDPOINT: ${process.env['APPROVAL_ENDPOINT']} || '',
    GOOGLE_CLIENT_ID: ${process.env['GOOGLE_CLIENT_ID']} || '',
    COMPANY_PROFILE_ENDPOINT: ${process.env['COMPANY_PROFILE_ENDPOINT']} || '',
    TALENT_PROFILE_ENDPOINT: ${process.env['TALENT_PROFILE_ENDPOINT']} || '',
    GET_TALENT_PROFILE_ENDPOINT: ${process.env['GET_TALENT_PROFILE_ENDPOINT']} || '',
    GET_COMPANY_PROFILE_ENDPOINT: ${process.env['GET_COMPANY_PROFILE_ENDPOINT']} || '',
    CREATE_PROGRAM_ENDPOINT: ${process.env['CREATE_PROGRAM_ENDPOINT']} || '',
    GET_ALL_PROGRAMMES: ${process.env['GET_ALL_PROGRAMMES']} || '',
    GET_DRAFT_PROGRAMMES: ${process.env['GET_DRAFT_PROGRAMMES']} || '',
    UPDATE_PROGRAMMES: ${process.env['UPDATE_PROGRAMMES']} || '',
    DELETE_PROGRAMME: ${process.env['DELETE_PROGRAMME']} || '',
    PUBLISH_PROGRAMME: ${process.env['PUBLISH_PROGRAMME']} || '',
    UPDATE_PROGRAMME: ${process.env['UPDATE_PROGRAMME']} || '',
    GET_ALL_QUIZZES: ${process.env['GET_ALL_QUIZZES']} || '',
  
    GET_ALL_APPLICANTS: ${process.env['GET_ALL_APPLICANTS']} || '',
    VIEW_APPLICANT_PROFILE: ${process.env['VIEW_APPLICANT_PROFILE']} || '',
    APPLICANT_SHORTLIST: ${process.env['APPLICANT_SHORTLIST']} || '',
    APPLICANT_REJECT: ${process.env['APPLICANT_REJECT']} || '',
    APPLICANT_BADGES: ${process.env['APPLICANT_BADGES']} || ''
  
};
`;
console.log(process.env);
// // Write the environment file
fs.writeFileSync(targetPath, envConfigFile, 'utf8');
// console.log(`Environment file created at ${targetPath}`); 