import React from 'react';

// page
const ExamPage = React.lazy(() => import("./components/exam"));

//router path
export const EXAM = "*";
//routers
const adminRoute = [
    {
        path: EXAM,
        name: 'Exam',
        element: <ExamPage></ExamPage>
    }
];

const routes = {
    adminRoute,
};

export default routes;

