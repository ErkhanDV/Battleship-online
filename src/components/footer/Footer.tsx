import { ReactComponent as Logo } from "../../assets/svg/rs_school_js.svg";

import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer_authors">
        <h4 className="footer_title">
          Created by <span className="title-accent">Power Rangers</span>
        </h4>
        <ul className="authors-list">
          <li className="authors-list_item">
            <a
              className="authors-list_link"
              href="https://github.com/pa4ka1992/"
              title="github.com/pa4ka1992"
            >
              pa4ka1992
            </a>
          </li>
          <li className="authors-list_item">
            <a
              className="authors-list_link"
              href="https://github.com/ErkhanDV/"
              title="github.com/ErkhanDV"
            >
              ErkhanDV
            </a>
          </li>
          <li className="authors-list_item">
            <a
              className="authors-list_link"
              href="https://github.com/mshns/"
              title="github.com/mshns"
            >
              mshns
            </a>
          </li>
        </ul>
      </div>

      <h4 className="footer_title">
        BattleShip Online <span className="title-copyright">2023</span>
      </h4>

      <a href="https://rs.school/js/" title="RSS">
        <Logo className="footer_school" />
      </a>
    </footer>
  );
}

export default Footer;
