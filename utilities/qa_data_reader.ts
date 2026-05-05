import * as fs from 'fs';
import * as path from 'path';

export interface CourseDetails {
    courseName: string;
    basePrice: string;
    discountedPrice: string;
    startDate: string;
    refundDate: string;
    programName: string;
    secureCheckout: string;
}

export interface CoursePrices {
    upfrontPrice: string;
    installmentCount: string;
    pricePerInstallment: string;
}

//the Master Blueprint that matches the root of your JSON!
export interface QaData {
    course: CourseDetails;
    "course-prices": CoursePrices;
}

export class DataReader {
    static getQaData(): QaData {
        // process.cwd() grabs your main project folder.
        // Then we just walk into the 'data' folder and grab the JSON!
        const filePath = path.join(process.cwd(), 'data', 'qa_data.json');
        
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const parsedData = JSON.parse(rawData) as QaData;
        
        return parsedData;
    }
}


