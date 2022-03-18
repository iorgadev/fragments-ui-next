import { Amplify } from "@aws-amplify/core";
import { Auth } from "@aws-amplify/auth";
import awsconfigure from "./aws-exports";
Amplify.configure(awsconfigure);
Auth.configure(awsconfigure);
