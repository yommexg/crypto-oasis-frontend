import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Spinner } from "../../components";
// import axios from "axios";

// import logo from "../assets/logo.png";

// const baseURL = import.meta.env.VITE_API_URL;

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [verifyLoading, setVerifyLoading] = useState(true);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      navigate("/");
      return;
    }

    const verify = async () => {
      try {
        //   const res = await axios.get(
        //     `${baseURL}/api/auth/verify-email?token=${token}`
        //   );
        navigate("/register", { state: { isVerified: true, email: "abc" } });
      } catch (err) {
        console.log(err);
        navigate("/");
      } finally {
        setVerifyLoading(false);
      }
    };

    verify();
  }, [searchParams, navigate]);

  if (verifyLoading) {
    return <Spinner />;
  }
};

export default VerifyEmail;
