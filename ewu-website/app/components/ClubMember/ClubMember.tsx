import { useClubData } from "@lib/hooks/useClubData";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { YesOrNo } from "@lib/services/clubMember/clubMember.service.type";
import "./ClubMember.scss";

const ClubMember: React.FC = () => {
  const { clubMember } = useClubData();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  const moderators = clubMember?.filter(
    (member) => member?.isModerators === YesOrNo.YES
  );

  const executives = clubMember?.filter(
    (member) => member?.isExecutive === YesOrNo.YES
  );

  const pathname = usePathname();

  const des = pathname?.split("/")[3];

  const members = des === "moderators" ? moderators : executives;

  return (
    <div className="club-members-section-body">
      <div className="container">
        <div>
          <div className="row">
            {clubMember &&
              members?.map((member, i) => (
                <div className="col-md-3" key={i}>
                  <div
                    {...(!isStatic
                      ? {
                          "data-aos":
                            window.innerWidth < 800 ? "fade-up" : "fade-right",
                        }
                      : {})}
                    className="club-member-card"
                  >
                    <Image
                      src={
                        member?.photoUrl
                          ? member?.photoUrl
                          : "https://static.vecteezy.com/system/resources/previews/063/477/498/large_2x/illustration-of-generic-male-avatar-in-gray-tones-for-anonymous-profile-placeholder-with-neutral-expression-designed-for-use-in-online-platforms-and-social-media-vector.jpg"
                      }
                      width={250}
                      height={300}
                      alt={`${member?.fullName} Photo`}
                      style={{ objectFit: "cover", objectPosition: "top" }}
                    />
                    <div className="club-member-info">
                      <h6>{member?.fullName}</h6>
                      <p>{member?.designation}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubMember;
