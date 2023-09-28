import { useState, useEffect } from "react";
import { Logo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";

import { loginUser, registerUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const initialState = {
    name: "",
    email: "",
    password: "",
    isMember: true,
};

const Register = () => {
    const [values, setValues] = useState(initialState);
    const dispatch = useDispatch();
    const { isLoading, user } = useSelector((store) => store.user);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setValues({ ...values, [name]: value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, isMember } = values;
        if (!email || !password || (!isMember && !name)) {
            toast.error("Please Fill Out All Fields");
            return;
        }
        if (isMember) {
            dispatch(loginUser({ email: email, password: password }));
            return;
        }
        dispatch(registerUser({ name, email, password }));
    };

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember });
    };

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate("/");
            }, 3000);
        }
    }, [user]);

    return (
        <Wrapper className="full-page">
            <form className="form" onSubmit={onSubmit}>
                <Logo />
                <h3> {values.isMember ? "Login" : "Register"} </h3>

                {/* name field */}
                {!values.isMember && <FormRow type="text" value={values.name} name="name" handleChange={handleChange} />}
                {/* email field */}
                <FormRow type="email" value={values.email} name="email" handleChange={handleChange} />
                {/* name field */}
                <FormRow type="password" value={values.password} name="password" handleChange={handleChange} />

                <button type="submit" className="btn btn-block" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Submit"}
                </button>
                <button
                    type="button"
                    className="btn btn-block btn-hipster"
                    disabled={isLoading}
                    onClick={() => {
                        dispatch(loginUser({ email: "testUser@test.com", password: "secret" }));
                    }}
                >
                    {isLoading ? "loading..." : "demo"}
                </button>
                {/* right after submit btn */}
                {/* toggle button */}

                <p>
                    {values.isMember ? "Not a member yet?" : "Already a member?"}

                    <button type="button" onClick={toggleMember} className="member-btn">
                        {values.isMember ? "Register" : "Login"}
                    </button>
                </p>
            </form>
        </Wrapper>
    );
};

export default Register;
