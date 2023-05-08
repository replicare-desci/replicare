import React, { createContext, ReactNode, useContext, useState } from "react";
// import { auth } from "../firebase/firebase";
import { ContextInterface, ContextType } from "../types/context.d";

// initialize the store and setStore values
const defaultState: ContextInterface = {
  store: {
    user: {
      firstName: "",
      lastName: "",
      walletAddress: "",
      chain: "",
      emailID: "",
      id: "",
      isVerified: false,
    },
    paperData: {
      id: "", // userPaperID
      userID: "",
      paper_type: "candidate",
      workflow_stage: "select_paper",
      is_author: true,
      is_creator: true,
      shareable_link: false,
      // select paper data start

      paper: {
        title: "",
        author: "",
        doi: "",
        publication_name: "",
        publication_year: "",
        journal_name: "",
      }, //doi
      reproduction_package_available: "",
      authors_contacted: "",
      authors_response: [],
      reproduction_package_from_scratch: "",
      original_reproduction_packages: [
        {
          content_type: "code",
          name: "",
          stage: "original",
          url: "",
        },
      ],

      // select paper data end

      // scoping summarize paper data step1 start
      project_nickname: "",
      start_date: "",
      end_date: "",
      expected_total_hours: 1,
      familiarity_level: "",
      outputs: {
        num_tables_body: 0,
        num_figures_body: 0,
        num_inline_results_body: 0,
        num_tables_appendix: "",
        num_figures_appendix: "",
      },
      whole_population: "",
      additional_population: "",
      num_claims: 1,
      claim_type_other_description: "",
      will_assess_whole_paper: "", //wil investigate
      summary: "",

      // scoping summarize paper data step1 end

      // scoping data step 2 start
      revised_reproduction_packages: [
        {
          content_type: "code",
          name: "",
          stage: "revised",
          url: "",
        },
      ],
      // scoping data step 2 end

      // scoping data step 3 start
      claims: {
        claimSummary: "",
        short_description: "", //claim title
        focused_population: "",
        identified_preferred_specification: "",

        estimates: {
          name: "",
          estimate: "",
          standard_error: "",
          units: "",
          p_value: "",
          confidence_interval: "",
          other_statistic: "",
          page: "",
          column: "",
          row: "",
          inline_paragraph: "",
          econometric_method: "",
          specify_method: "",
        },
        econometric_categorization_confidence: 0, //slider
      },
      // scoping data step 3 end

      // scoping data step 4 start
      possible_robustness_checks: "",
      // scoping data step 4 end
    },
  },

  setStore: (): void => {},
};

export const ContextDefault = createContext(defaultState);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  let firstNameLocal = sessionStorage.getItem("firstName");
  let lastNameLocal = sessionStorage.getItem("lastName");
  let walletAddressLocal = sessionStorage.getItem("walletAddress");
  let chainLocal = sessionStorage.getItem("chain");
  let emailIDLocal = sessionStorage.getItem("emailID");
  let idLocal = sessionStorage.getItem("id");
  let isVerifiedLocal = sessionStorage.getItem("isVerified");

  const [store, setStore] = useState<ContextType>({
    user: {
      firstName: firstNameLocal || "",
      lastName: lastNameLocal || "",
      walletAddress: walletAddressLocal || "",
      chain: chainLocal || "",
      emailID: emailIDLocal || "",
      id: idLocal || "",
      isVerified: isVerifiedLocal === "true" ? true : false,
    },
    paperData: {
      id: "", // userPaperID
      userID: idLocal || "",
      paper_type: "candidate",
      workflow_stage: "select_paper",
      is_author: true,
      is_creator: true,
      shareable_link: false,
      // select paper data start

      paper: {
        title: "",
        author: "",
        doi: "",
        publication_name: "",
        publication_year: "",
        journal_name: "",
      }, //doi
      reproduction_package_available: "",
      authors_contacted: "",
      authors_response: [],
      reproduction_package_from_scratch: "",
      original_reproduction_packages: [
        {
          content_type: "code",
          name: "",
          stage: "original",
          url: "",
        },
      ],

      // select paper data end

      // scoping summarize paper data step1 start
      project_nickname: "",
      start_date: "",
      end_date: "",
      expected_total_hours: 1,
      familiarity_level: "",
      outputs: {
        num_tables_body: 0,
        num_figures_body: 0,
        num_inline_results_body: 0,
        num_tables_appendix: "",
        num_figures_appendix: "",
      },
      whole_population: "",
      additional_population: "",
      num_claims: 1,
      claim_type_other_description: "",
      will_assess_whole_paper: "", //wil investigate
      summary: "",

      // scoping summarize paper data step1 end

      // scoping data step 2 start
      revised_reproduction_packages: [
        {
          content_type: "code",
          name: "",
          stage: "revised",
          url: "",
        },
      ],
      // scoping data step 2 end

      // scoping data step 3 start
      claims: {
        claimSummary: "",
        short_description: "", //claim title
        focused_population: "",
        identified_preferred_specification: "",

        estimates: {
          name: "",
          estimate: "",
          standard_error: "",
          units: "",
          p_value: "",
          confidence_interval: "",
          other_statistic: "",
          page: "",
          column: "",
          row: "",
          inline_paragraph: "",
          econometric_method: "",
          specify_method: "",
        },
        econometric_categorization_confidence: 0, //slider
      },
      // scoping data step 3 end

      // scoping data step 4 start
      possible_robustness_checks: "",
      // scoping data step 4 end
    },
  });

  // FIXME: uncomment after research for multiple output consoles and states
  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     console.log("Firebase state", user);
  //   });
  // }, []);

  return (
    <ContextDefault.Provider value={{ store, setStore }}>
      {children}
    </ContextDefault.Provider>
  );
};

export default ContextProvider;
export const UserContext = () => {
  return useContext(ContextDefault);
};
