import Member from './memberBlock/memberBlock';
import Dzmitry from '../../assets/img/Dzmitry.png';
import Olga from '../../assets/img/Olga.png';
import Ruslana from '../../assets/img/Ruslana.png';
import './aboutUs.scss';
import RSLogo from '../../assets/img/rs-logo.svg';

function About() {
  return (
    <div className="about-us">
      <div className="intoduction">
        <h2>Meet our team:</h2>
        <p className="introduction-text">
          We are a passionate and dedicated front-end development team committed to delivering a
          polished and responsive user experience. Our journey began at
          <a href="https://rs.school/" className="logo-link" target="blank">
            <img className="rs-logo" src={RSLogo} alt="rs-logo" />
            RS School
          </a>
          , where we met and discovered a shared passion for web development. This common starting
          point brought us together as a team, allowing each of us to bring our unique strengths to
          the project. Through collaboration, continuous learning, and mutual support, we worked in
          harmony to bring our shared vision to life.
        </p>
      </div>
      <Member
        imgSrc={Dzmitry}
        name="Dzmitry Aliakseyeu"
        roleMember="Team Lead"
        info="Dzmitry is a passionate junior front-end developer who enjoys bringing user-friendly interfaces to life. With a love for clean design and responsive code, he’s always eager to learn and grow in the world of web development. Outside of work, Dzmitry enjoys traveling, hiking, running, and reading — always exploring new paths both in nature and in tech."
        gitLink="https://github.com/DzmitryAliakseyeu"
        gitName="DzmitryAliakseyeu"
      />
      <Member
        imgSrc={Ruslana}
        name="Ruslana Tretiakova"
        roleMember="Developer"
        info="Ruslana is a junior front-end developer with two years of dedicated learning and hands-on experience in building responsive, user-focused interfaces using JavaScript, TypeScript, React, and Vue 3. She is highly self-motivated, detail-oriented, and quick to adopt modern frontend technologies and best practices. Ruslana is currently seeking a supportive, collaborative team where she can continue to grow professionally, contribute to real-world projects, and gain deeper commercial development experience. In her free time, she enjoys discovering the world one slope at a time and getting lost in a good book."
        gitLink="https://github.com/ruslanatretiakova"
        gitName="ruslanatretiakova"
      />
      <Member
        imgSrc={Olga}
        name="Olga Nikanorova"
        roleMember="Developer"
        info="Originally from Ukraine, Olga relocated to the UK in 2022. She has professional experience as a front-end developer, primarily working with Vue.js 2. After her initial project was closed, she completed a short-term contract in England. However, due to market conditions, she faced challenges securing a new role in tech and temporarily returned to the finance sector.
Although she has a two-year gap in her IT career, she is currently focused on upskilling and returning to front-end development. She is actively refreshing her technical knowledge and learning modern technologies to re-enter the industry with confidence."
        gitLink="https://github.com/nikanorra"
        gitName="nikanorra"
      />
      <h2>Contribution to the project:</h2>
      <h3> Dzmitry Aliakseyeu </h3>
      <p className="contribution-point">
        Designed and implemented routing and navigation across the application/
      </p>
      <p className="contribution-point">
        Built core pages including Home, Product, About Us, and a global Loading screen
      </p>
      <p className="contribution-point">
        Integrated and configured a commercetools project as the primary backend
      </p>
      <p className="contribution-point">
        Developed product listing features with sorting, filtering, and search using the
        commercetools API
      </p>
      <p className="contribution-point">
        Organized project workflows by setting up a Jira board, creating tasks, and assigning
        responsibilities to team members
      </p>

      <h3>Ruslana Tretiakova</h3>
      <p className="contribution-point">
        Implemented the entire user registration flow, including form validation, authentication
        integration, automatic login, and address selection
      </p>
      <p className="contribution-point">
        Built a full-featured user profile page with editable personal information, email, password,
        and address management
      </p>
      <p className="contribution-point">
        Developed interactive shopping cart functionality with add/remove logic using the API
      </p>
      <p className="contribution-point">
        Contributed to initial project setup, including TypeScript configuration, Vitest testing,
        Husky Git hooks, and a modular folder structure
      </p>

      <h3>Olga Nikanorova</h3>
      <p className="contribution-point">Implemented token management and user authentication</p>
      <p className="contribution-point">
        Fully developed the product detail card with dynamic data and interaction
      </p>
      <p className="contribution-point">
        Created the shopping cart page with item rendering, bulk removal, and promo code
        functionality
      </p>
      <p className="contribution-point">
        Customized Commercetools setup to meet project-specific requirements
      </p>
    </div>
  );
}

export default About;
