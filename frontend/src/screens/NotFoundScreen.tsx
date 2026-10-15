import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/Global/Navbar";
import "../styles/notFound.css";

function NotFoundScreen() {
  const navigate = useNavigate();

  return (
    <div className="nf">
      <Navbar position="static" />

      <main className="nf__main">
        <div className="nf__code" aria-hidden="true">
          <span>4</span>
          <span className="nf__orb">
            <SearchOffIcon className="nf__orb-icon" />
          </span>
          <span>4</span>
        </div>

        <p className="nf__eyebrow">Error 404</p>

        <h1 className="nf__title">We don&apos;t know a guy for that page</h1>

        <p className="nf__text">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
          Let&apos;s get you back to finding the right pro.
        </p>

        <div className="nf__actions">
          <Button
            className="nf__btn"
            variant="contained"
            component={Link}
            to="/"
            startIcon={<HomeIcon />}
          >
            Back to home
          </Button>

          <Button
            className="nf__btn"
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            Go back
          </Button>
        </div>
      </main>
    </div>
  );
}

export default NotFoundScreen;