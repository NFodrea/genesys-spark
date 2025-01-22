import { toHTML } from '../utils/to-html.js';
import { componentSpecs } from '../component-specs.js';
import {
  registerSparkComponents,
  registerSparkChartComponents
} from 'genesys-spark';
import '../styles/component-listing.scss';

export async function bootstrap() {
  await Promise.all([
    registerSparkComponents(),
    registerSparkChartComponents()
  ]);

  const components = Object.values(componentSpecs)
    .filter(component => component.example)
    .sort((a, b) => a.tag.localeCompare(b.tag));

  document.body.appendChild(
    toHTML(`
        <main>
          <header id="top-bar">
            <div class="logo">${sparkLogo}</div>
            <nav id="mode-switcher-section">
              <gux-button accent="secondary" id="mode-switcher">
                <gux-icon id="mode-action-icon" icon-name="fa/moon-regular"></gux-icon>
                <gux-tooltip-beta aria-hidden="true">
                  <span  id="mode-action-tooltip" slot="content">Toggle Dark Mode</span>
                </gux-tooltip-beta>
              </gux-button>
            </nav>
          </header>
        <div id="inner-content">
            <nav class="components-list">
                <div class="sticky-header">
                    <h2>Components</h2>
                    <gux-form-field-search class="component-search-field" label-position="screenreader">
                      <input
                        id="component-search-box"
                        slot="input"
                        name="search"
                        type="search"
                        placeholder="Enter a search"
                      />
                      <label slot="label">Search for a component</label>
                    </gux-form-field-search>
                </div>
                <div class="component-items-wrapper">
                ${components
                  .map(component => {
                    let name = shortName(component.tag);
                    if (component.beta) {
                      name += `<sup> 𝜷</sup>`;
                    }

                    return `<a data-id="${component.folderName}" class="component-item" href="#${component.folderName}">${name}</a>`;
                  })
                  .join('')}
                  </div>
                  <div class="sticky-footer">
                    <h2 id="mode-switcher-enabler">Resources</h2>
                    <a class="resources-link" href="https://github.com/MyPureCloud/genesys-spark/blob/main/docs/migration-guides/v4/readme.md" target="_blank">V3 -> V4 Migration Guide</a>
                    <a class="resources-link" href="https://spark.genesys.com" target="_blank">Spark 4.0 UX Documentation</a>
                    <a class="resources-link" href="https://github.com/MyPureCloud/genesys-spark/blob/main/README.md#genesys-web-components" target="_blank">Genesys Spark Components README</a>
                  </div>
            </nav>
            <iframe id="componentFrame" title="Component Examples"/>
            </div>
        </main>
    `)
  );

  const searchHandler = event => {
    const searchText = event.target.value;
    document
      .querySelectorAll('.components-list .component-item')
      .forEach(item => {
        if (item.textContent.toLowerCase().includes(searchText.toLowerCase())) {
          item.classList.remove('hide-item');
        } else {
          item.classList.add('hide-item');
        }
      });
  };

  function getActiveComponent() {
    const hash = window.location.hash || `#${components[0].folderName}`;
    document
      .querySelectorAll('.components-list .component-item')
      .forEach(item => {
        if (item.getAttribute('data-id') === hash.slice(1).toLowerCase()) {
          item.classList.add('active-component');
          item.setAttribute('aria-current', 'page');
        } else {
          item.classList.remove('active-component');
          item.removeAttribute('aria-current');
        }
      });
  }

  function modeSwitchEnablerHandler(event) {
    if (event.detail >= 5) {
      document.getElementById('mode-switcher-section').classList.add('enabled');
    }
  }

  function modeSwitchHandler() {
    //Get the mode to change to
    const mode =
      document.documentElement.getAttribute('flare-mode') == 'dark'
        ? 'light'
        : 'dark';

    //Change the toggle icon and tooltip on the top navbar
    document.documentElement.setAttribute('flare-mode', mode);
    document
      .getElementById('mode-action-icon')
      .setAttribute(
        'icon-name',
        `fa/${mode == 'light' ? 'moon' : 'sun-bright'}-regular`
      );
    document.getElementById('mode-action-tooltip').innerText =
      `Toggle ${mode == 'light' ? 'Dark' : 'Light'} Mode`;

    //Chagne the mode of the iframes
    Array.from(document.querySelectorAll('iframe'))
      .map(iframe => iframe.contentDocument)
      .forEach(doc => {
        doc.documentElement.setAttribute('flare-mode', mode);
      });
  }

  const searchBox = document.getElementById('component-search-box');
  searchBox.addEventListener('input', searchHandler);

  const modeSwitcherEnabler = document.getElementById('mode-switcher-enabler');
  modeSwitcherEnabler.addEventListener('click', modeSwitchEnablerHandler);

  const modeSwitcher = document.getElementById('mode-switcher');
  modeSwitcher.addEventListener('click', modeSwitchHandler);

  function hashHandler() {
    const iframe = document.getElementById('componentFrame');
    const hash = window.location.hash || `#${components[0].folderName}`;

    //When changing the src of the iframe change its mode
    //Using url params so it can also change in supernova
    const mode = document.documentElement.getAttribute('flare-mode') ?? 'light';

    iframe.src = `./${hash.slice(1)}.html?flare-mode=${mode}`;
  }

  function onHashChange() {
    hashHandler();
    getActiveComponent();
  }

  window.addEventListener('hashchange', onHashChange);
  onHashChange();
}

function shortName(component) {
  return component.replace(/^gux-/, '');
}

var sparkLogo = `
<svg role="img" aria-label="Spark" width="279" height="44" viewBox="0 0 279 44" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .cls-1{fill: var(--gse-semantic-foreground-container-specialAccents-brand);}
      .cls-2{fill:currentColor;}
      .cls-3{stroke: var(--gse-semantic-border-container-edges-default);}
    </style>

  </defs>
  <g data-name="Layer 2" id="Layer_2">
    <g data-name="Layer 1" id="Layer_1-2">
    <path class="cls-1" d="M10.1019 43.9294L26.3507 24.4622C26.4029 24.41 26.4134 24.3264 26.3716 24.2532L25.0445 21.5259C25.0132 21.4632 24.9505 21.4214 24.8773 21.4214L13.9891 21.4423H13.7696L13.801 21.2229L15.7237 8.73589C15.7341 8.65229 15.6923 8.5687 15.6192 8.53735L12.6724 7.19983C12.5993 7.16848 12.5053 7.18937 12.453 7.25207L0.0391289 22.0589C-0.00266863 22.1111 -0.0131225 22.1947 0.0182257 22.2574L1.3662 25.016C1.39755 25.0787 1.46024 25.1205 1.53338 25.1205L9.51672 25.1101L6.84167 42.4561C6.83123 42.5397 6.87303 42.6232 6.94618 42.6546L9.90335 43.9921C9.96605 44.013 10.0496 43.9921 10.1019 43.9294ZM11.523 35.9774L13.174 25.2564L13.1949 25.0996L21.0738 25.0892L11.4081 36.6567L11.523 35.9774ZM5.7236 21.4528H5.31607L5.57731 21.1393L10.6975 15.0264L11.1364 14.5039L10.0705 21.4423H9.9138L5.7236 21.4528Z" fill="#FF451A"/>
<path class="cls-2" d="M33.7595 11.9853C34.0102 11.7136 34.3446 11.5256 34.7521 11.4211C35.1597 11.3061 35.6194 11.2643 36.121 11.2852C36.5076 11.3061 36.8838 11.3897 37.2391 11.5464C37.5944 11.6927 37.9183 11.8913 38.19 12.1107C38.4617 12.3302 38.6811 12.5914 38.8379 12.8526L41.8891 11.0449C41.9727 10.9926 41.9936 10.8777 41.9518 10.7941C41.8891 10.7001 41.8159 10.6165 41.7532 10.5224C41.6592 10.397 41.5756 10.2821 41.4711 10.1671C41.3875 10.0731 41.2935 9.98949 41.2099 9.89545C41.0949 9.78051 40.9904 9.66556 40.865 9.56107C40.7814 9.48792 40.6978 9.43567 40.6143 9.36253C40.468 9.24758 40.3321 9.13264 40.1754 9.0386C40.1649 9.02815 40.1545 9.02815 40.144 9.0177C39.9141 8.8714 39.6843 8.73556 39.4335 8.61017C38.3258 8.05635 37.1033 7.78467 35.7762 7.78467C34.679 7.78467 33.6654 8.00411 32.725 8.43253C31.7845 8.86096 31.0217 9.48792 30.4365 10.2925C29.8514 11.0971 29.5588 12.048 29.5588 13.1557C29.5588 14.1588 29.8305 15.0156 30.3843 15.7158C30.9381 16.4263 31.6696 17.001 32.5787 17.4504C33.4878 17.8997 34.47 18.2236 35.5254 18.4326C35.9225 18.5371 36.3404 18.6416 36.7689 18.7565C37.1973 18.8715 37.5526 19.0491 37.8347 19.279C38.1168 19.5089 38.2631 19.8328 38.2631 20.2403C38.2631 20.627 38.1482 20.9509 37.9078 21.1912C37.6675 21.4316 37.354 21.6197 36.9674 21.7346C36.5808 21.8495 36.1837 21.9122 35.7553 21.9122C35.2537 21.9122 34.7939 21.8286 34.376 21.6615C33.958 21.4943 33.6027 21.2853 33.2997 21.0345C32.9966 20.7837 32.7772 20.5434 32.6518 20.3239L29.402 21.7137C29.3185 21.7555 29.2767 21.8495 29.2976 21.9436C29.4125 22.163 29.5379 22.372 29.6842 22.5706C29.7364 22.6541 29.7887 22.7377 29.8514 22.8213C30.0813 23.1139 30.3529 23.3856 30.6455 23.6364C31.2725 24.1484 31.983 24.5559 32.7981 24.8485C33.6027 25.1411 34.4491 25.3187 35.3164 25.371C36.4763 25.4546 37.563 25.2874 38.5871 24.8694C39.6111 24.4514 40.4366 23.8349 41.0845 23.0199C41.7323 22.2153 42.0563 21.2644 42.0563 20.1881C42.0667 19.9478 42.0458 19.7283 42.0249 19.5089C41.9413 18.8506 41.701 18.2654 41.3039 17.7534C40.7814 17.0742 40.0813 16.4995 39.2245 16.0292C38.3676 15.559 37.4376 15.1619 36.4554 14.838C36.0165 14.7022 35.5672 14.5768 35.097 14.4723C34.6268 14.3573 34.2192 14.2006 33.8848 13.9916C33.5505 13.7826 33.3833 13.4691 33.3833 13.0512C33.3833 12.6123 33.5087 12.257 33.7595 11.9853Z" fill="#B2B7C4"/>
<path class="cls-2" d="M53.7701 25.5484C54.9927 25.5484 56.1421 25.3185 57.1975 24.8588C58.2529 24.399 59.1933 23.772 59.9979 22.957C60.8026 22.1524 61.44 21.2119 61.8893 20.1356C62.3386 19.0698 62.5685 17.9204 62.5685 16.7082C62.5685 16.4052 62.558 16.1126 62.5267 15.8096C62.4431 14.9319 62.2341 14.0855 61.8893 13.2913C61.44 12.2359 60.8026 11.2955 59.9979 10.4909C59.1933 9.68626 58.2529 9.04885 57.1975 8.58908C56.1421 8.1293 54.9927 7.89941 53.7701 7.89941C52.7043 7.89941 51.7638 8.13975 50.9697 8.60997C50.1755 9.0802 49.4963 9.69671 48.9529 10.4595V8.52638C48.9529 8.42188 48.8694 8.33829 48.7649 8.33829H45.0658C44.9613 8.33829 44.8777 8.42188 44.8777 8.52638V33.2287C44.8777 33.3332 44.9613 33.4064 45.0553 33.4168H48.7753C48.8798 33.4064 48.9529 33.3332 48.9529 33.2287V22.9674C49.1828 23.2809 49.4336 23.5526 49.7053 23.8138C49.7889 23.8974 49.862 23.981 49.9456 24.0542C50.2591 24.3363 50.5935 24.5975 50.9697 24.817C51.7638 25.3081 52.6938 25.5484 53.7701 25.5484ZM49.8725 19.1639C49.5904 18.61 49.4127 18.004 49.3396 17.3666C49.3187 17.1576 49.3082 16.9381 49.3082 16.7082C49.3082 15.82 49.4963 15.005 49.8725 14.2631C50.2487 13.5316 50.7711 12.936 51.4399 12.4971C52.1087 12.0583 52.8715 11.8388 53.7179 11.8388C54.5852 11.8388 55.3793 12.0583 56.0794 12.4971C56.79 12.936 57.3542 13.5212 57.7722 14.2631C58.0857 14.8169 58.2842 15.4125 58.3678 16.0499C58.3992 16.2589 58.4096 16.4784 58.4096 16.7082C58.4096 17.6069 58.2007 18.4324 57.7722 19.1743C57.3438 19.9162 56.7795 20.5014 56.069 20.9403C55.3584 21.3791 54.5643 21.5881 53.7074 21.5881C52.861 21.5881 52.0982 21.3687 51.4294 20.9298C50.7711 20.5014 50.2487 19.9058 49.8725 19.1639Z" fill="#B2B7C4"/>
<path class="cls-2" d="M81.8892 8.35919H78.2111C78.0961 8.35919 78.0125 8.45323 78.023 8.56817L78.1902 10.5013C77.5736 9.7385 76.8317 9.12199 75.954 8.63087C75.0762 8.13975 74.094 7.89941 72.9864 7.89941C71.7951 7.89941 70.6771 8.11885 69.6426 8.56817C68.6081 9.0175 67.6885 9.63401 66.9048 10.4282C66.1107 11.2223 65.4942 12.1419 65.0553 13.1868C64.6164 14.2317 64.397 15.3603 64.397 16.5515C64.397 16.865 64.4074 17.168 64.4388 17.4606C64.5224 18.3593 64.7418 19.2161 65.0866 20.0207C65.5464 21.1074 66.1943 22.0583 67.0093 22.8838C67.8244 23.7093 68.7753 24.3572 69.862 24.8274C70.9383 25.2976 72.0982 25.5275 73.3416 25.5275C74.3657 25.5275 75.2539 25.2976 76.0062 24.8379C76.7586 24.3781 77.3647 23.772 77.8244 23.0197L77.9916 24.9215C78.0021 25.0155 78.0752 25.0887 78.1693 25.0887H81.8997C82.0042 25.0782 82.0773 25.0051 82.0773 24.9006V8.55772C82.0773 8.44278 81.9937 8.35919 81.8892 8.35919ZM77.1139 19.1639C76.7377 19.9058 76.2152 20.4909 75.5465 20.9298C74.8777 21.3687 74.1045 21.5777 73.2372 21.5777C72.3908 21.5777 71.6175 21.3582 70.9069 20.9298C70.1964 20.5014 69.6321 19.9058 69.2141 19.1743C68.9007 18.6205 68.7021 18.0249 68.6185 17.377C68.5872 17.1576 68.5767 16.9381 68.5767 16.7187C68.5767 15.8201 68.7857 14.9946 69.2037 14.2631C69.6217 13.5316 70.1859 12.936 70.8965 12.4971C71.607 12.0583 72.3908 11.8388 73.2476 11.8388C74.1045 11.8388 74.8673 12.0583 75.5465 12.4867C76.2257 12.9151 76.7482 13.5107 77.1243 14.2526C77.4065 14.8065 77.5841 15.4125 77.6572 16.0604C77.6781 16.2798 77.6886 16.4993 77.6886 16.7187C77.6781 17.6069 77.4901 18.4324 77.1139 19.1639Z" fill="#B2B7C4"/>
<path class="cls-2" d="M95.9438 8.10879C95.8288 8.07744 95.7139 8.05654 95.6094 8.03564C95.4527 8.00429 95.2959 7.9625 95.1496 7.9416C95.0138 7.9207 94.8884 7.9207 94.7526 7.91025C94.6063 7.8998 94.46 7.87891 94.3137 7.87891C93.3941 7.87891 92.5477 8.05655 91.7536 8.40138C90.9594 8.75665 90.2802 9.22687 89.7159 9.83294L89.7055 8.53721C89.7055 8.43272 89.6219 8.34913 89.5174 8.34913H85.8183C85.7138 8.34913 85.6302 8.43272 85.6302 8.53721L85.6511 24.8801C85.6511 24.9846 85.7347 25.0577 85.8288 25.0681H89.5488C89.6533 25.0577 89.7264 24.9846 89.7264 24.8801V15.5697C89.7264 14.9113 89.8831 14.3157 90.2071 13.7724C90.5206 13.229 90.949 12.8006 91.4924 12.4871C92.0357 12.1736 92.6313 12.0064 93.2896 12.0064C93.3837 12.0064 93.4777 12.0273 93.5613 12.0378C93.6554 12.0482 93.7599 12.0482 93.8539 12.0691C93.9584 12.09 94.0629 12.1214 94.1569 12.1527C94.2301 12.1736 94.3032 12.1841 94.3764 12.205C94.4704 12.2363 94.5749 12.1945 94.6063 12.1005L96.0692 8.34913C96.1005 8.25508 96.0378 8.15058 95.9438 8.10879Z" fill="#B2B7C4"/>
<path class="cls-2" d="M112.882 24.7964L107.396 15.3188C107.396 15.3188 107.396 15.3188 107.396 15.3084L107.333 15.1934L112.809 8.66254C112.903 8.53715 112.819 8.35951 112.663 8.35951H107.825C107.772 8.35951 107.72 8.38041 107.678 8.4222L102.537 14.556C102.537 14.556 102.537 14.556 102.527 14.556L102.203 14.9531V0.188089C102.203 0.0835954 102.119 0 102.015 0H98.3157C98.2112 0 98.1276 0.0835954 98.1276 0.188089V24.8904C98.1276 24.9949 98.2112 25.0681 98.3052 25.0785H102.025C102.13 25.0681 102.203 24.9949 102.203 24.8904V21.2958L104.543 18.5059L108.305 24.9845C108.337 25.0367 108.399 25.0681 108.462 25.0785H112.746C112.861 25.0681 112.945 24.9218 112.882 24.7964Z" fill="#B2B7C4"/>
<line class="cls-3" x1="122.404" y1="30" x2="122.404" y2="14"/>
<path class="cls-2" d="M144.508 18.432L142.324 27H140.26L139.096 22.5C139.072 22.412 139.04 22.28 139 22.104C138.968 21.928 138.928 21.736 138.88 21.528C138.84 21.32 138.804 21.124 138.772 20.94C138.74 20.748 138.716 20.6 138.7 20.496C138.692 20.6 138.668 20.748 138.628 20.94C138.596 21.124 138.56 21.32 138.52 21.528C138.48 21.728 138.44 21.92 138.4 22.104C138.36 22.28 138.328 22.416 138.304 22.512L137.152 27H135.088L132.904 18.432H134.692L135.784 23.112C135.816 23.248 135.852 23.416 135.892 23.616C135.932 23.808 135.972 24.012 136.012 24.228C136.052 24.436 136.088 24.64 136.12 24.84C136.16 25.04 136.188 25.212 136.204 25.356C136.22 25.204 136.244 25.032 136.276 24.84C136.308 24.64 136.344 24.44 136.384 24.24C136.424 24.032 136.46 23.84 136.492 23.664C136.532 23.48 136.568 23.336 136.6 23.232L137.848 18.432H139.564L140.812 23.232C140.836 23.336 140.868 23.48 140.908 23.664C140.948 23.84 140.988 24.032 141.028 24.24C141.068 24.448 141.104 24.652 141.136 24.852C141.168 25.044 141.192 25.212 141.208 25.356C141.232 25.156 141.268 24.92 141.316 24.648C141.364 24.368 141.416 24.088 141.472 23.808C141.536 23.528 141.588 23.296 141.628 23.112L142.72 18.432H144.508ZM147.907 20.328C148.515 20.328 149.035 20.444 149.467 20.676C149.907 20.908 150.247 21.244 150.487 21.684C150.727 22.124 150.847 22.664 150.847 23.304V24.168H146.623C146.639 24.672 146.787 25.068 147.067 25.356C147.355 25.644 147.751 25.788 148.255 25.788C148.679 25.788 149.063 25.748 149.407 25.668C149.751 25.58 150.107 25.448 150.475 25.272V26.652C150.155 26.812 149.815 26.928 149.455 27C149.103 27.08 148.675 27.12 148.171 27.12C147.515 27.12 146.935 27 146.431 26.76C145.927 26.512 145.531 26.14 145.243 25.644C144.955 25.148 144.811 24.524 144.811 23.772C144.811 23.004 144.939 22.368 145.195 21.864C145.459 21.352 145.823 20.968 146.287 20.712C146.751 20.456 147.291 20.328 147.907 20.328ZM147.919 21.6C147.575 21.6 147.287 21.712 147.055 21.936C146.831 22.16 146.699 22.508 146.659 22.98H149.167C149.167 22.716 149.119 22.48 149.023 22.272C148.935 22.064 148.799 21.9 148.615 21.78C148.431 21.66 148.199 21.6 147.919 21.6ZM154.085 20.004C154.085 20.252 154.077 20.496 154.061 20.736C154.045 20.976 154.029 21.164 154.013 21.3H154.085C154.261 21.028 154.497 20.8 154.793 20.616C155.089 20.424 155.473 20.328 155.945 20.328C156.681 20.328 157.277 20.616 157.733 21.192C158.189 21.76 158.417 22.6 158.417 23.712C158.417 24.456 158.309 25.084 158.093 25.596C157.885 26.1 157.593 26.48 157.217 26.736C156.841 26.992 156.401 27.12 155.897 27.12C155.417 27.12 155.037 27.036 154.757 26.868C154.485 26.692 154.261 26.496 154.085 26.28H153.965L153.665 27H152.297V17.88H154.085V20.004ZM155.369 21.756C155.057 21.756 154.809 21.82 154.625 21.948C154.441 22.076 154.305 22.272 154.217 22.536C154.137 22.792 154.093 23.116 154.085 23.508V23.7C154.085 24.332 154.177 24.82 154.361 25.164C154.553 25.5 154.897 25.668 155.393 25.668C155.761 25.668 156.053 25.5 156.269 25.164C156.485 24.82 156.593 24.328 156.593 23.688C156.593 23.048 156.481 22.568 156.257 22.248C156.041 21.92 155.745 21.756 155.369 21.756ZM166.787 19.824C166.443 19.824 166.135 19.892 165.863 20.028C165.599 20.164 165.375 20.36 165.191 20.616C165.007 20.864 164.867 21.168 164.771 21.528C164.683 21.888 164.639 22.292 164.639 22.74C164.639 23.348 164.711 23.868 164.855 24.3C165.007 24.724 165.243 25.048 165.563 25.272C165.883 25.496 166.291 25.608 166.787 25.608C167.139 25.608 167.487 25.568 167.831 25.488C168.183 25.408 168.563 25.296 168.971 25.152V26.676C168.595 26.828 168.223 26.94 167.855 27.012C167.487 27.084 167.075 27.12 166.619 27.12C165.739 27.12 165.011 26.94 164.435 26.58C163.867 26.212 163.447 25.7 163.175 25.044C162.903 24.38 162.767 23.608 162.767 22.728C162.767 22.08 162.855 21.488 163.031 20.952C163.207 20.408 163.463 19.94 163.799 19.548C164.143 19.156 164.563 18.852 165.059 18.636C165.563 18.42 166.139 18.312 166.787 18.312C167.211 18.312 167.635 18.368 168.059 18.48C168.491 18.584 168.903 18.728 169.295 18.912L168.707 20.388C168.387 20.236 168.063 20.104 167.735 19.992C167.415 19.88 167.099 19.824 166.787 19.824ZM176.6 23.712C176.6 24.256 176.524 24.74 176.372 25.164C176.228 25.588 176.016 25.948 175.736 26.244C175.464 26.532 175.132 26.752 174.74 26.904C174.348 27.048 173.904 27.12 173.408 27.12C172.952 27.12 172.528 27.048 172.136 26.904C171.752 26.752 171.42 26.532 171.14 26.244C170.86 25.948 170.64 25.588 170.48 25.164C170.328 24.74 170.252 24.256 170.252 23.712C170.252 22.984 170.38 22.372 170.636 21.876C170.892 21.372 171.26 20.988 171.74 20.724C172.22 20.46 172.788 20.328 173.444 20.328C174.06 20.328 174.604 20.46 175.076 20.724C175.548 20.988 175.92 21.372 176.192 21.876C176.464 22.372 176.6 22.984 176.6 23.712ZM172.076 23.712C172.076 24.144 172.12 24.508 172.208 24.804C172.304 25.092 172.452 25.312 172.652 25.464C172.852 25.608 173.112 25.68 173.432 25.68C173.752 25.68 174.008 25.608 174.2 25.464C174.4 25.312 174.544 25.092 174.632 24.804C174.728 24.508 174.776 24.144 174.776 23.712C174.776 23.28 174.728 22.92 174.632 22.632C174.544 22.344 174.4 22.128 174.2 21.984C174 21.84 173.74 21.768 173.42 21.768C172.948 21.768 172.604 21.932 172.388 22.26C172.18 22.58 172.076 23.064 172.076 23.712ZM185.77 20.328C186.514 20.328 187.074 20.52 187.45 20.904C187.834 21.28 188.026 21.888 188.026 22.728V27H186.238V23.172C186.238 22.7 186.158 22.348 185.998 22.116C185.838 21.876 185.59 21.756 185.254 21.756C184.782 21.756 184.446 21.924 184.246 22.26C184.046 22.596 183.946 23.08 183.946 23.712V27H182.158V23.172C182.158 22.86 182.122 22.6 182.05 22.392C181.978 22.184 181.87 22.028 181.726 21.924C181.582 21.812 181.398 21.756 181.174 21.756C180.846 21.756 180.586 21.84 180.394 22.008C180.202 22.176 180.066 22.42 179.986 22.74C179.906 23.06 179.866 23.452 179.866 23.916V27H178.078V20.448H179.446L179.686 21.288H179.782C179.918 21.064 180.086 20.884 180.286 20.748C180.486 20.604 180.706 20.5 180.946 20.436C181.194 20.364 181.442 20.328 181.69 20.328C182.17 20.328 182.578 20.408 182.914 20.568C183.25 20.72 183.506 20.96 183.682 21.288H183.838C184.038 20.952 184.314 20.708 184.666 20.556C185.026 20.404 185.394 20.328 185.77 20.328ZM193.515 20.328C194.251 20.328 194.847 20.616 195.303 21.192C195.759 21.76 195.987 22.6 195.987 23.712C195.987 24.456 195.879 25.084 195.663 25.596C195.447 26.1 195.151 26.48 194.775 26.736C194.399 26.992 193.963 27.12 193.467 27.12C193.155 27.12 192.883 27.08 192.651 27C192.427 26.92 192.235 26.816 192.075 26.688C191.915 26.56 191.775 26.424 191.655 26.28H191.559C191.591 26.432 191.615 26.592 191.631 26.76C191.647 26.92 191.655 27.08 191.655 27.24V29.88H189.867V20.448H191.319L191.571 21.3H191.655C191.775 21.124 191.919 20.964 192.087 20.82C192.255 20.668 192.455 20.548 192.687 20.46C192.927 20.372 193.203 20.328 193.515 20.328ZM192.939 21.756C192.627 21.756 192.379 21.82 192.195 21.948C192.011 22.076 191.875 22.272 191.787 22.536C191.707 22.792 191.663 23.116 191.655 23.508V23.7C191.655 24.124 191.695 24.484 191.775 24.78C191.855 25.068 191.991 25.288 192.183 25.44C192.375 25.592 192.635 25.668 192.963 25.668C193.235 25.668 193.459 25.592 193.635 25.44C193.811 25.288 193.943 25.064 194.031 24.768C194.119 24.472 194.163 24.112 194.163 23.688C194.163 23.048 194.063 22.568 193.863 22.248C193.671 21.92 193.363 21.756 192.939 21.756ZM203.413 23.712C203.413 24.256 203.337 24.74 203.185 25.164C203.041 25.588 202.829 25.948 202.549 26.244C202.277 26.532 201.945 26.752 201.553 26.904C201.161 27.048 200.717 27.12 200.221 27.12C199.765 27.12 199.341 27.048 198.949 26.904C198.565 26.752 198.233 26.532 197.953 26.244C197.673 25.948 197.453 25.588 197.293 25.164C197.141 24.74 197.065 24.256 197.065 23.712C197.065 22.984 197.193 22.372 197.449 21.876C197.705 21.372 198.073 20.988 198.553 20.724C199.033 20.46 199.601 20.328 200.257 20.328C200.873 20.328 201.417 20.46 201.889 20.724C202.361 20.988 202.733 21.372 203.005 21.876C203.277 22.372 203.413 22.984 203.413 23.712ZM198.889 23.712C198.889 24.144 198.933 24.508 199.021 24.804C199.117 25.092 199.265 25.312 199.465 25.464C199.665 25.608 199.925 25.68 200.245 25.68C200.565 25.68 200.821 25.608 201.013 25.464C201.213 25.312 201.357 25.092 201.445 24.804C201.541 24.508 201.589 24.144 201.589 23.712C201.589 23.28 201.541 22.92 201.445 22.632C201.357 22.344 201.213 22.128 201.013 21.984C200.813 21.84 200.553 21.768 200.233 21.768C199.761 21.768 199.417 21.932 199.201 22.26C198.993 22.58 198.889 23.064 198.889 23.712ZM208.61 20.328C209.314 20.328 209.878 20.52 210.302 20.904C210.726 21.28 210.938 21.888 210.938 22.728V27H209.15V23.172C209.15 22.7 209.066 22.348 208.898 22.116C208.73 21.876 208.462 21.756 208.094 21.756C207.55 21.756 207.178 21.944 206.978 22.32C206.778 22.688 206.678 23.22 206.678 23.916V27H204.89V20.448H206.258L206.498 21.288H206.594C206.738 21.064 206.914 20.884 207.122 20.748C207.33 20.604 207.562 20.5 207.818 20.436C208.074 20.364 208.338 20.328 208.61 20.328ZM215.477 20.328C216.085 20.328 216.605 20.444 217.037 20.676C217.477 20.908 217.817 21.244 218.057 21.684C218.297 22.124 218.417 22.664 218.417 23.304V24.168H214.193C214.209 24.672 214.357 25.068 214.637 25.356C214.925 25.644 215.321 25.788 215.825 25.788C216.249 25.788 216.633 25.748 216.977 25.668C217.321 25.58 217.677 25.448 218.045 25.272V26.652C217.725 26.812 217.385 26.928 217.025 27C216.673 27.08 216.245 27.12 215.741 27.12C215.085 27.12 214.505 27 214.001 26.76C213.497 26.512 213.101 26.14 212.813 25.644C212.525 25.148 212.381 24.524 212.381 23.772C212.381 23.004 212.509 22.368 212.765 21.864C213.029 21.352 213.393 20.968 213.857 20.712C214.321 20.456 214.861 20.328 215.477 20.328ZM215.489 21.6C215.145 21.6 214.857 21.712 214.625 21.936C214.401 22.16 214.269 22.508 214.229 22.98H216.737C216.737 22.716 216.689 22.48 216.593 22.272C216.505 22.064 216.369 21.9 216.185 21.78C216.001 21.66 215.769 21.6 215.489 21.6ZM223.587 20.328C224.291 20.328 224.855 20.52 225.279 20.904C225.703 21.28 225.915 21.888 225.915 22.728V27H224.127V23.172C224.127 22.7 224.043 22.348 223.875 22.116C223.707 21.876 223.439 21.756 223.071 21.756C222.527 21.756 222.155 21.944 221.955 22.32C221.755 22.688 221.655 23.22 221.655 23.916V27H219.867V20.448H221.235L221.475 21.288H221.571C221.715 21.064 221.891 20.884 222.099 20.748C222.307 20.604 222.539 20.5 222.795 20.436C223.051 20.364 223.315 20.328 223.587 20.328ZM230.514 25.692C230.714 25.692 230.906 25.672 231.09 25.632C231.274 25.592 231.458 25.544 231.642 25.488V26.82C231.45 26.9 231.21 26.968 230.922 27.024C230.642 27.088 230.334 27.12 229.998 27.12C229.606 27.12 229.254 27.056 228.942 26.928C228.638 26.8 228.394 26.58 228.21 26.268C228.034 25.948 227.946 25.508 227.946 24.948V21.792H227.094V21.036L228.078 20.436L228.594 19.056H229.734V20.448H231.57V21.792H229.734V24.948C229.734 25.196 229.806 25.384 229.95 25.512C230.094 25.632 230.282 25.692 230.514 25.692ZM236.218 27V18.432H238.03V25.5H241.51V27H236.218ZM244.647 20.448V27H242.859V20.448H244.647ZM243.759 17.88C244.023 17.88 244.251 17.944 244.443 18.072C244.635 18.192 244.731 18.42 244.731 18.756C244.731 19.084 244.635 19.312 244.443 19.44C244.251 19.568 244.023 19.632 243.759 19.632C243.487 19.632 243.255 19.568 243.063 19.44C242.879 19.312 242.787 19.084 242.787 18.756C242.787 18.42 242.879 18.192 243.063 18.072C243.255 17.944 243.487 17.88 243.759 17.88ZM248.303 20.004C248.303 20.252 248.295 20.496 248.279 20.736C248.263 20.976 248.247 21.164 248.231 21.3H248.303C248.479 21.028 248.715 20.8 249.011 20.616C249.307 20.424 249.691 20.328 250.163 20.328C250.899 20.328 251.495 20.616 251.951 21.192C252.407 21.76 252.635 22.6 252.635 23.712C252.635 24.456 252.527 25.084 252.311 25.596C252.103 26.1 251.811 26.48 251.435 26.736C251.059 26.992 250.619 27.12 250.115 27.12C249.635 27.12 249.255 27.036 248.975 26.868C248.703 26.692 248.479 26.496 248.303 26.28H248.183L247.883 27H246.515V17.88H248.303V20.004ZM249.587 21.756C249.275 21.756 249.027 21.82 248.843 21.948C248.659 22.076 248.523 22.272 248.435 22.536C248.355 22.792 248.311 23.116 248.303 23.508V23.7C248.303 24.332 248.395 24.82 248.579 25.164C248.771 25.5 249.115 25.668 249.611 25.668C249.979 25.668 250.271 25.5 250.487 25.164C250.703 24.82 250.811 24.328 250.811 23.688C250.811 23.048 250.699 22.568 250.475 22.248C250.259 21.92 249.963 21.756 249.587 21.756ZM257.769 20.328C257.857 20.328 257.961 20.332 258.081 20.34C258.201 20.348 258.297 20.36 258.369 20.376L258.237 22.056C258.181 22.04 258.097 22.028 257.985 22.02C257.881 22.004 257.789 21.996 257.709 21.996C257.477 21.996 257.253 22.028 257.037 22.092C256.821 22.148 256.625 22.24 256.449 22.368C256.281 22.496 256.145 22.668 256.041 22.884C255.945 23.092 255.897 23.352 255.897 23.664V27H254.109V20.448H255.465L255.729 21.552H255.813C255.941 21.328 256.101 21.124 256.293 20.94C256.485 20.756 256.705 20.608 256.953 20.496C257.209 20.384 257.481 20.328 257.769 20.328ZM262.012 20.316C262.892 20.316 263.564 20.508 264.028 20.892C264.5 21.268 264.736 21.848 264.736 22.632V27H263.488L263.14 26.112H263.092C262.908 26.344 262.716 26.536 262.516 26.688C262.324 26.84 262.1 26.948 261.844 27.012C261.596 27.084 261.288 27.12 260.92 27.12C260.536 27.12 260.188 27.048 259.876 26.904C259.572 26.752 259.332 26.524 259.156 26.22C258.98 25.908 258.892 25.516 258.892 25.044C258.892 24.348 259.136 23.836 259.624 23.508C260.112 23.172 260.844 22.988 261.82 22.956L262.96 22.92V22.632C262.96 22.288 262.868 22.036 262.684 21.876C262.508 21.716 262.26 21.636 261.94 21.636C261.62 21.636 261.308 21.684 261.004 21.78C260.7 21.868 260.396 21.98 260.092 22.116L259.504 20.904C259.856 20.72 260.244 20.576 260.668 20.472C261.1 20.368 261.548 20.316 262.012 20.316ZM262.264 23.988C261.688 24.004 261.288 24.108 261.064 24.3C260.84 24.492 260.728 24.744 260.728 25.056C260.728 25.328 260.808 25.524 260.968 25.644C261.128 25.756 261.336 25.812 261.592 25.812C261.976 25.812 262.3 25.7 262.564 25.476C262.828 25.244 262.96 24.92 262.96 24.504V23.964L262.264 23.988ZM270.226 20.328C270.314 20.328 270.418 20.332 270.538 20.34C270.658 20.348 270.754 20.36 270.826 20.376L270.694 22.056C270.638 22.04 270.554 22.028 270.442 22.02C270.338 22.004 270.246 21.996 270.166 21.996C269.934 21.996 269.71 22.028 269.494 22.092C269.278 22.148 269.082 22.24 268.906 22.368C268.738 22.496 268.602 22.668 268.498 22.884C268.402 23.092 268.354 23.352 268.354 23.664V27H266.566V20.448H267.922L268.186 21.552H268.27C268.398 21.328 268.558 21.124 268.75 20.94C268.942 20.756 269.162 20.608 269.41 20.496C269.666 20.384 269.938 20.328 270.226 20.328ZM271.079 20.448H273.035L274.271 24.132C274.311 24.252 274.343 24.372 274.367 24.492C274.399 24.612 274.423 24.736 274.439 24.864C274.463 24.992 274.479 25.128 274.487 25.272H274.523C274.547 25.064 274.579 24.868 274.619 24.684C274.667 24.492 274.719 24.308 274.775 24.132L275.987 20.448H277.907L275.135 27.84C274.967 28.288 274.747 28.664 274.475 28.968C274.211 29.272 273.903 29.5 273.551 29.652C273.199 29.804 272.815 29.88 272.399 29.88C272.199 29.88 272.023 29.868 271.871 29.844C271.727 29.828 271.599 29.808 271.487 29.784V28.368C271.575 28.384 271.679 28.4 271.799 28.416C271.927 28.432 272.059 28.44 272.195 28.44C272.443 28.44 272.655 28.388 272.831 28.284C273.015 28.18 273.167 28.036 273.287 27.852C273.407 27.676 273.503 27.484 273.575 27.276L273.683 26.952L271.079 20.448Z" fill="#4F5157"/>
</g>
  </g>
</svg>`;

bootstrap();
