import styles from "./gridComp.module.css";
import Link from "next/link";
import SearchModal from "../SearchModal/SearchModal";
import ResultModal from "../ResultModal/ResultModal";
import { useRouter } from "next/router";
import { useState } from "react";
import Modal from "./Modal";
import SearchIcon from "../..//public/FFR-assets/Icons/search_icon.svg";
import Image from "next/image";


export default function GridComp({ fellowship }) {
  // console.log(fellowship, "HERE");
  // const allLocations = fellowship.map((f) => f.fields.location);
  // console.log(allLocations);
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleViewMode, setToggleViewMode] = useState(false);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [resultPopup, setResultPopup] = useState(false);
  const [country, setCountry] = useState();
  const [checkbox, setCheckBox] = useState(false);

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(checkbox, "HERE!");
    // console.log(country, "HERE IS COUNTRY");

    try {
      /**
       * Take the form's submit event and grab the target, extend it with the input by the name of the input
       * @type {HTMLFormElement & { search: HTMLInputElement }}
       */
      const target = event.target;

      setSearchTerm(target.search.value);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className={styles.searchOpt}>
        <div className={styles.searchMain}>
          <div className={styles.searchThreeButtons}>
            <button className={styles.buttonFilters} onClick={() => setButtonPopup(true)}>Filters: None</button>
          </div>

          <SearchModal trigger={buttonPopup} setTrigger={setButtonPopup}>
            <div>
              <h1 className="label">Filter open calls by</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <h1>location</h1>
                <label htmlFor="location">location:</label>
                <select
                  className="select"
                  onChange={(e) => setCountry(e.target.value)}
                  id="location"
                  name="location"
                >
                  <option isdisabled="true">select country</option>
                  <option value="France">France</option>
                  <option value="Germany">Germany</option>

                  <option value="India">India</option>
                  <option value="England">England</option>
                </select>
              </div>
              <div>
                <h1>type</h1>
                <input
                  type="checkbox"
                  id="production"
                  name="production"
                  checkbox={checkbox}
                  onChange={(e) => setCheckBox(e.target.checked)}
                />
                <label htmlFor="production">production</label>
                <input type="checkbox" id="Exhibition" name="Exhibition" />
                <label htmlFor="Exhibition">Exhibition</label>
                <input type="checkbox" id="Research" name="Research" />
                <label htmlFor="Research">Research</label>
              </div>

              <div>
                <h1>Eligibility</h1>
                <label htmlFor="Eligibility">Eligibility:</label>
                <select id="Eligibility" name="Eligibility">
                  <option isdisabled="true">select criteria</option>
                  <option value="example">1</option>
                  <option value="example">2</option>
                  <option value="example">3</option>
                  <option value="example">4</option>
                </select>
              </div>

              <div>
                <h1>Application Fee</h1>
                <input
                  type="checkbox"
                  id="Without Application Fee"
                  name="Without Application Fee"
                />
                <label htmlFor="Without Application Fee">
                  Without Application Fee
                </label>
              </div>

              <div>
                <h1>Duration</h1>
                <label htmlFor="Duration">Duration:</label>
                <select id="Duration" name="Duration">
                  <option isdisabled="true">select residency duration</option>
                  <option value="example">1</option>
                  <option value="example">2</option>
                  <option value="example">3</option>
                  <option value="example">4</option>
                </select>
              </div>

              <div>
                <h1>Field</h1>
                <input type="checkbox" id="Visual" name="Visual" />
                <label htmlFor="Visual">Visual</label>
                <input
                  type="checkbox"
                  id="Multidisciplinary"
                  name="Multidisciplinary"
                />
                <label htmlFor="Multidisciplinary">Multidisciplinary</label>
                <input type="checkbox" id="Curatorial" name="Curatorial" />
                <label htmlFor="Curatorial">Curatorial</label>
                <input type="checkbox" id="Sound" name="Sound" />
                <label htmlFor="Sound">Sound</label>
                <input type="checkbox" id="Literature" name="Literature" />
                <label htmlFor="Literature">Literature</label>
                <input type="checkbox" id="Performance" name="Performance" />
                <label htmlFor="Performance">Performance</label>
                <input type="checkbox" id="Dance" name="Dance" />
                <label htmlFor="Dance">Dance</label>
              </div>

              <button type="submit"> Search </button>
            </form>
          </SearchModal>

          <div className={styles.searchThreeButtons}>
            <div >
              <select className={styles.dropdownBtn}
                name="dateOrg">
          <label className="label" htmlFor="dateOrg">sort by:</label>
                  <option value="deadline-approaching">Sort by: Deadline approaching</option>
                  <option value="recently-added">Sort by: Recently added</option>
                </select> 
            </div>
          </div>

          <button className={styles.toggleBtn} onClick={() => setToggleViewMode(!toggleViewMode)}>
            {toggleViewMode ? "view as: Cards" : " view as: List"}
          </button>
        </div>
          <div >  
            <form 
              className="is-align-content-end"
             onSubmit={handleSubmit}>
              <div className="control is-flex has-addons">
                <input 
                  className={styles.searchBar}
                  type="search"
                  name="search"
                  id="search"
                  role="search"
                  placeholder="Search Opportunities....."
                />
                <div >
                  <button className={styles.searchBtn} type="submit"><Image className={styles.btnSearchIcon} src={SearchIcon} alt="search"></Image></button>
                
                </div>
              </div>
            </form>
          </div>
      </div>

      <ul className={styles.wrapper}>
        {fellowship
          .filter((val) => {
            if (searchTerm == "") {
              return true;
            } else {
              return val.fields.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            }
          })
          .filter((fellowship) => {
            return country
              ? fellowship?.fields?.location?.toLowerCase() ===
                  country.toLowerCase()
              : true;
          })

          .map((fellowship) => {
            console.log(fellowship, "HERE I AM");
            const {
              title,
              slug,
              category,
              money,
              paragraph,
              thumbnail,
              location,
              type,
            } = fellowship.fields;

            if (!toggleViewMode === true) {
              return (
                <div className={styles.cards} key={fellowship.sys.id}>
                  <Modal
                    title={title}
                    slug={slug}
                    category={category}
                    money={money}
                    paragraph={paragraph}
                    thumbnail={thumbnail}
                    fellowship={fellowship}
                    location={location}
                    type={type}
                  />
                </div>
              );
            } else if (!toggleViewMode === false) {
              return (
                <div className={styles.cards} key={fellowship.sys.id}>
                  <div>
                    {title}
                    {/* <img
                          src={thumbnail.fields.file.url}
                          height="300px"
                          width="350px"
                        /> */}
                    <ul>
                      {/* <li>{slug}</li>
                          <li>{category}</li>
                          <li>location</li> */}
                      <li>{money}</li>
                    </ul>
                    <p>{paragraph}</p>
                    <button onClick={() => setResultPopup(true)}>
                      Read more
                    </button>

                    <ResultModal
                      fellowship={fellowship}
                      trigger={resultPopup}
                      setTrigger={setResultPopup}
                    >
                      {/* <img
                          src={thumbnail.fields.file.url}
                          height="300px"
                          width="350px"
                        /> */}
                      {/* <h1>{slug}</h1>
                      <h1>{title}</h1> */}
                      <p>{category}</p>
                      <p>{money}</p>
                      <p>{paragraph}</p>
                    </ResultModal>
                  </div>
                </div>
              );
            }
          })}
      </ul>
    </div>
  );
}
