import './memberBlock.scss';
import GitLogo from '../../../assets/img/git-logo.svg';

interface MemberI {
  imgSrc: string;
  name: string;
  roleMember: string;
  info: string;
  gitLink: string;
  gitName: string;
}

function Member({ imgSrc, name, roleMember, info, gitLink, gitName }: MemberI) {
  return (
    <div className="member">
      <div className="member-icon">
        <img src={imgSrc} alt="member-our-team" />
      </div>
      <div className="member-description">
        <h2 className="member-role">{roleMember}</h2>
        <h3 className='member-name'>{name}</h3>
        <p className="member-bio">{info}</p>

        <a href={gitLink}>
          <img src={GitLogo} alt="git-logo" />
          {gitName}
        </a>
      </div>
    </div>
  );
}

export default Member;
