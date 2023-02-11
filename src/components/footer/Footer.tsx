import { Link } from 'react-router-dom';

import { ReactComponent as RssLogo } from '../../assets/svg/rs_school_js.svg';

import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <h4 className="footer_copyright">
        BattleShip Online <span className="title-copyright">2023</span>
      </h4>

      <div className="footer_authors">
        <h4 className="footer_title">
          Created by <span className="title-accent">Power Rangers</span>
        </h4>
        <ul className="authors-list">
          <li className="authors-list_item">
            <Link
              className="authors-list_link"
              to="https://github.com/pa4ka1992/"
              title="github.com/pa4ka1992"
            >
              pa4ka1992
            </Link>
          </li>
          <li className="authors-list_item">
            <Link
              className="authors-list_link"
              to="https://github.com/ErkhanDV/"
              title="github.com/ErkhanDV"
            >
              ErkhanDV
            </Link>
          </li>
          <li className="authors-list_item">
            <Link
              className="authors-list_link"
              to="https://github.com/mshns/"
              title="github.com/mshns"
            >
              mshns
            </Link>
          </li>
        </ul>
      </div>

      <Link to="https://rs.school/js/" className="footer_school" title="RS School">
        <RssLogo className="school-logo"/>
      </Link>
    </footer>
  );
};

export default Footer;
