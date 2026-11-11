import { useParams } from 'react-router'
import Navbar from '../../components/Global/Navbar'
import "../../styles/profileScreen.css";
import { useProfessional } from '../../hooks/user/useProfessional';
import LoadingScreen from '../LoadingScreen';
import { Avatar, Tab, Tabs } from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import { colorFromId } from '../../utils';

function ProfessionalDetailScreen() {
    const { professionalId } = useParams();
    const { data: professional, isPending, isError, error } = useProfessional(professionalId);
    
    const fullName = `${professional?.firstName} ${professional?.lastName}`.trim();
    const location = [professional?.city, professional?.zip].filter(Boolean).join(", ") || "Not provided";

  return (
    <div className="profile">
        <Navbar position='static'/>

        {isPending && <LoadingScreen fullScreen={false}/>}
        {isError ? (
            <h1>{error.message}</h1>
        ) : (
            <main className="profile__main">
                {/* ---------- Hero ---------- */}
                <section className="profile__card profile__hero">
                    <div className="profile__banner" style={{ "background": colorFromId(String(professionalId)) }} aria-hidden="true" />

                    <div className="profile__hero-body">
                        <Avatar
                            className="profile__avatar"
                            src={professional?.profilePicturePath || undefined}
                            alt={fullName}
                        >
                            {professional?.firstName.charAt(0)}
                        </Avatar>

                        <div className="profile__identity">
                            <div className="profile__name-row">
                                <h1 className="profile__name">{fullName}</h1>
                            </div>

                            <p className="profile__username">@{professional?.username || "username"}</p>

                            <ul className="profile__meta">
                                <li className="profile__meta-item">
                                    <LocationOn className="profile__meta-icon" />
                                    {location}
                                </li>
                            </ul>
                        </div>

                    </div>
                </section>

                {/* ---------- Body ---------- */}
                <div className="profile__grid">
                    {/* Main column */}
                    <section className="profile__card profile__content">
                        <div className="profile__tabs-header">
                            <Tabs value={0} aria-label="Professional profile sections">
                                <Tab className="profile__tab" label="About" />
                                <Tab className="profile__tab" label="Past Jobs" />
                            </Tabs>
                        </div>

                        <div className="profile__section">
                            <h2 className="profile__section-title">About</h2>
                            <p className="profile__bio">
                                {professional?.bio || "No bio has been added yet."}
                            </p>
                        </div>


                    </section>

                {/* Sidebar */}
                <aside className="profile__card profile__side">
                    <div>
                        <h2 className="profile__side-title">Account details</h2>
                        
                        <ul className="profile__contact">

                            <li className="profile__contact-item">
                                <span className="profile__contact-icon">
                                    <LocationOn fontSize="small" />
                                </span>

                                <span className="profile__contact-text">
                                    <span className="profile__label">Location</span>
                                    <span className="profile__value">{location}</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <dl className="profile__facts">
                            <div className="profile__fact">
                                <dt>First name</dt>
                                <dd>{professional?.firstName}</dd>
                            </div>

                            <div className="profile__fact">
                                <dt>Last name</dt>
                                <dd>{professional?.lastName || "Not provided"}</dd>
                            </div>

                            <div className="profile__fact">
                                <dt>Username</dt>
                                <dd>{professional?.username || "Not provided"}</dd>
                            </div>
                        </dl>
                    </div>
                </aside>
                </div>
            </main>
        )}


    </div>
  )
}

export default ProfessionalDetailScreen