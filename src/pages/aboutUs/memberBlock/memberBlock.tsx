import './memberBlock.scss';
import GitLogo from '../../../assets/img/git-logo.svg';

interface MemberI {
  imgSrc: string;
  roleMember: string;
  info: string;
}

function Member({ imgSrc, roleMember, info }: MemberI) {
  return (
    <div className="member">
      <div className="member-icon">
        <img src={imgSrc} alt="member-our-team" />
      </div>
      <div className="member-description">
        <h2 className="member-role">{roleMember}</h2>
        <p className="member-bio">{info}</p>

        <a href="https://github.com/DzmitryAliakseyeu">
          <img src={GitLogo} alt="git-logo" />
          DzmitryAliakseyeu
        </a>
      </div>
    </div>
  );
}

export default Member;
