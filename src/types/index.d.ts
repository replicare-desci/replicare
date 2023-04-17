export type doiData = {
  title: string;
  author: string;
  doi: string;
  publication_name: string;
  publication_year: string;
};

export type original_reproduction_packages = {
  id: number;
  stage: string;
  content_type: string;
  name: string;
  url: string;
};

export type revised_reproduction_packages = {
  id: number;
  stage: string;
  content_type: string;
  name: string;
  url: string;
};

export type outputs = {
  attempt_all_inline_results_body: string;
  attempt_all_tables_appendix: string;
  attempt_all_figures_appendix: string;
};

export type paperData = {
  id: string;
  userID: string;
  author_did_not_respond_as_of_date: string;
  authors_available: boolean;
  authors_contacted: boolean;
  authors_response: string[];
  authors_response_not_ready_date: string;
  authors_response_other: string;
  claim_type: string;
  claim_type_other_description: string;
  created_at: string;
  expected_total_hours: string;
  familiarity_level: string;
  is_author: boolean;
  is_creator: boolean;
  shareable_link: boolean;
  paper: doiData;
  authors_response_other: string;
  authors_response_not_ready_date: string;
  expected_total_hours: number;
  num_claims: number;
  claim_type: string;
  claim_type_other_description: string;
  num_claims_will_assess: string;
  paper_type: string;
  workflow_stage: string;
  author_did_not_respond_as_of_date: string;
  start_date: string;
  end_date: string;
  summary: string;
  whole_population: string;
  additional_population: string;
  possible_robustness_checks: string;
  reproduction_package_available: boolean;
  authors_contacted: boolean;
  authors_available: boolean;
  reproduction_package_from_scratch: boolean;
  will_assess_whole_paper: boolean;
  outputs: outputs;
  original_reproduction_packages: original_reproduction_packages[];
  revised_reproduction_packages: revised_reproduction_packages[];
  project_nickname: string;
};
