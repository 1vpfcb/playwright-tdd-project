import { faker } from '@faker-js/faker';
import process from "process";


export interface Applicant {
    firstName:string;
    lastName:string;
    phone: string;
    email: string;
    // uninion type to restrict the options for how the applicant heard about us
    hearAboutUs: "email" | "facebook" | "google" | "instagram" | "linkedin" | "twitter" | "friend" | "other";
}

export function generateApplicant() : Applicant {
    return {
        firstName : faker.person.firstName(),
        lastName : faker.person.lastName(),
        phone: faker.string.numeric(10),
        email: faker.internet.email(),
        hearAboutUs: "email"
    };
}


export const invalidEmails = [
    "plainaddress", 
    "@no-local-part.com", 
    "missing-domain@.com", 
    "multiple@@symbols.com",
    "spaces in@email.com"
];

export interface CardDetails {
    cardNumber: string;
    expiryDate: string;
    cvc: string;
    zipCode: string;
}

export function generateCardDetails() : CardDetails {
    return {
        cardNumber: process.env.CARD_NUMBER,
        expiryDate: process.env.EXPIRATION_DATE,
        cvc: process.env.CVC,
        zipCode: process.env.ZIP_CODE
    };
}



