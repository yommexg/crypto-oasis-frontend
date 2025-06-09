import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Spinner } from "../../components";
import { useAuth } from "../../store";
import { toast } from "react-toastify";

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const { isAuthLoading, verifyNewEmail } = useAuth();

  const hasFetched = useRef(false);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      navigate("/");
      return;
    }

    const verify = async () => {
      const { email, message, status } = await verifyNewEmail(token);

      if (status === "success") {
        navigate("/register", { state: { email } });
        toast.success(message);
      } else {
        navigate("/");
        toast.error(message);
      }
    };

    if (!hasFetched.current) {
      verify();
      hasFetched.current = true;
    }
  }, [searchParams, navigate, verifyNewEmail]);

  if (isAuthLoading) {
    return <Spinner />;
  }
};

export default VerifyEmail;
