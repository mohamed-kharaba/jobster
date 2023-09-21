import { Landing, Error, Dashboard, Register } from "./pages";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
        errorElement: <Error />,
    },
    {
        path: "Landing",
        element: <Landing />,
    },
    {
        path: "Register",
        element: <Register />,
    },
]);

// function App() {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/" element={<Dashboard />} />
//                 <Route path="landing" element={<Landing />} />
//                 <Route path="register" element={<Register />} />
//                 <Route path="*" element={<Error />} />
//             </Routes>
//         </BrowserRouter>
//     );
// }

// export default App;

const App = () => {
    return <RouterProvider router={router} />;
};
export default App;
