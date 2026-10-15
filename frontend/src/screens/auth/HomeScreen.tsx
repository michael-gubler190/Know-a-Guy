import { useLayoutEffect, useRef, useState } from "react";
import { Button, Chip, InputBase, SvgIcon, Typography } from "@mui/material";
import Navbar from "../../components/Global/Navbar";
import "../../styles/homeScreen.css";

const FILTERS = [
  "All",
  "Plumbing",
  "Electrical",
  "Landscaping",
  "Cleaning",
  "Carpentry",
  "Painting",
  "HVAC",
  "Roofing",
  "Moving",
  "Appliance Repair",
  "Flooring",
  "Pest Control",
  "Window Cleaning",
  "Handyman",
  "Locksmith",
];

function HomeScreen() {
  const [expanded, setExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const pillsRef = useRef<HTMLDivElement>(null);


  useLayoutEffect(() => {
    const el = pillsRef.current;
    if (!el) return;

    const measure = () => {
      const first = el.firstElementChild as HTMLElement | null;
      const last = el.lastElementChild as HTMLElement | null;
      setHasOverflow(!!first && !!last && last.offsetTop > first.offsetTop);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home">
      <Navbar position="static" />

      <section className="home__top">
        <div className="home__search">
          <SvgIcon className="home__search-icon">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </SvgIcon>

          <InputBase
            className="home__search-input"
            placeholder="Search for a professional or service"
            inputProps={{ "aria-label": "Search professionals" }}
          />
        </div>

        <div className="home__filters">
          <div
            id="home-filters"
            ref={pillsRef}
            className={`home__pills${expanded ? "" : " home__pills--collapsed"}`}
            role="list"
            aria-label="Filters"
          >
            {FILTERS.map((label, index) => (
              <Chip
                key={label}
                role="listitem"
                label={label}
                clickable
                color={index === 0 ? "primary" : "default"}
                variant={index === 0 ? "filled" : "outlined"}
                className={`home__pill${index === 0 ? "" : " home__pill--outlined"}`}
              />
            ))}
          </div>

          {hasOverflow && (
            <Button
              className={`home__toggle${expanded ? " home__toggle--expanded" : ""}`}
              variant="text"
              size="small"
              aria-expanded={expanded}
              aria-controls="home-filters"
              onClick={() => setExpanded((prev) => !prev)}
              endIcon={
                <SvgIcon>
                  <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                </SvgIcon>
              }
            >
              {expanded ? "Show less" : "Show more"}
            </Button>
          )}
        </div>
      </section>

      <div className="home__empty">
        <Typography variant="h5" component="p" className="home__empty-text">
          No results found
        </Typography>
      </div>
    </div>
  );
}

export default HomeScreen;