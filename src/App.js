import { Landing, Error, Register, ProtectedRoute } from "./pages";
import { Stats, Profile, AddJob, AllJobs, SharedLayout } from "./pages/Dashboard";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <SharedLayout />
            </ProtectedRoute>
        ),
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Stats />,
            },
            {
                path: "Profile",
                element: <Profile />,
            },
            {
                path: "AddJob",
                element: <AddJob />,
            },
            {
                path: "AllJobs",
                element: <AllJobs />,
            },
        ],
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
