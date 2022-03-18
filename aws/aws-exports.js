// // Amplify.Logger.LOG_LEVEL = "DEBUG";
// const awsconfigure = {
//   // Auth: {
//   // Amazon Region
//   region: "us-east-1",

//   // Amazon Cognito User Pool ID
//   userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_POOL_ID,

//   // Amazon Cognito App Client ID (26-char alphanumeric string)
//   userPoolWebClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID,

//   // Hosted UI configuration
//   oauth: {
//     // Amazon Hosted UI Domain
//     domain: process.env.NEXT_PUBLIC_AWS_COGNITO_HOSTED_UI_DOMAIN,

//     // These scopes must match what you set in the User Pool for this App Client
//     scope: ["email", "profile", "openid"],

//     // NOTE: these must match what you have specified in the Hosted UI
//     // app settings for Callback and Redirect URLs (e.g., no trailing slash).
//     redirectSignIn: process.env.NEXT_PUBLIC_OAUTH_SIGN_IN_REDIRECT_URL,
//     redirectSignOut: process.env.NEXT_PUBLIC_OAUTH_SIGN_OUT_REDIRECT_URL,

//     // We're using the Access Code Grant flow (i.e., `code`)
//     responseType: "code",
//   },
//   // },
// };
const awsconfigure = {
  aws_project_region: "us-east-1",
  // aws_cognito_identity_pool_id:
  //   "us-east-1:327776ec-d1e4-4ad4-99c3-8890815b3090",
  aws_cognito_region: "us-east-1",
  aws_user_pools_id: process.env.NEXT_PUBLIC_AWS_COGNITO_POOL_ID,
  aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID,
  oauth: {
    domain: process.env.NEXT_PUBLIC_AWS_COGNITO_HOSTED_UI_DOMAIN,
    scope: ["email", "openid", "profile"],
    redirectSignIn: process.env.NEXT_PUBLIC_OAUTH_SIGN_IN_REDIRECT_URL,
    redirectSignOut: process.env.NEXT_PUBLIC_OAUTH_SIGN_OUT_REDIRECT_URL,
    responseType: "code",
  },
  federationTarget: "COGNITO_USER_POOLS",
};

export default awsconfigure;
