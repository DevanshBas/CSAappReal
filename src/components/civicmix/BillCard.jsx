import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Assuming ShadCN Card component path

const BillCard = ({ bill }) => {
  return (
    <div className="bg-card rounded-2xl shadow-md p-5 hover:shadow-md hover:ring-2 hover:ring-primary transition-all duration-200">
      <Card>
        <CardHeader>
          <CardTitle>{bill.title}</CardTitle>
          <CardDescription>{bill.sponsor}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Date: {bill.date}</p>
          {/* Placeholder for Topic Badge */}
          <span className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded-full mt-2">
            {bill.topic}
          </span>
          {/* Placeholder for Impact Badge */}
          <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full mt-2 ml-2">
            Impact: {bill.impact}
          </span>
        </CardContent>
        <CardFooter>
          {/* Placeholder for Quick Preview and Details buttons */}
          <button className="mr-2">Quick Preview</button>
          <button>Details & Summary</button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BillCard;