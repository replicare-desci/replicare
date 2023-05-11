export type DoiData = {
  title: string;
  author: string;
  doi: string;
  publication_name: string;
  publication_year: string;
  journal_name: string;
};

export type original_reproduction_packages = {
  id?: number;
  stage?: string;
  content_type?: string;
  name: string;
  url: string;
};

export type revised_reproduction_packages = {
  id?: number;
  stage?: string;
  content_type?: string;
  name: string;
  url: string;
};

export type outputs = {
  attempt_all_inline_results_body?: string;
  attempt_all_tables_appendix?: string;
  attempt_all_figures_appendix?: string;
  num_tables_appendix?: string;
  num_figures_appendix?: string;
  num_tables_body?: number;
  num_figures_body?: number;
  num_inline_results_body?: number;
};
export type estimates = {
  name?: string;
  estimate?: string;
  standard_error?: string;
  units?: string;
  p_value?: string;
  confidence_interval?: string;
  other_statistic?: string;
  page?: string;
  column?: string;
  row?: string;
  inline_paragraph?: string;
  econometric_method?: string;
  specify_method: string;
};
export type claims = {
  claimSummary?: string;
  econometric_categorization_confidence?: number;
  focused_population?: string;
  identified_preferred_specification?: string;
  short_description?: string;
  estimates: estimates;
};

export type paperData = {
  id: string;
  userID: string;
  author_did_not_respond_as_of_date?: string;
  authors_contacted?: string;
  authors_response?: string[];
  authors_response_not_ready_date?: string;
  authors_response_other?: string;
  claims: claims;
  claim_type?: string;
  claim_type_other_description?: string;
  created_at?: any;
  expected_total_hours?: number;
  familiarity_level?: string;
  is_author?: boolean;
  is_creator?: boolean;
  shareable_link?: boolean;
  paper?: DoiData | null;
  authors_response_other?: string;
  authors_response_not_ready_date?: string;
  expected_total_hours?: number;
  num_claims?: number;

  // num_claims_will_assess?: string;
  paper_type: string;
  workflow_stage: string;
  author_did_not_respond_as_of_date?: string;
  start_date?: string;
  end_date?: string;
  summary?: string;
  whole_population?: string;
  additional_population?: string;
  possible_robustness_checks?: string;
  reproduction_package_available?: string;
  authors_contacted?: boolean;
  authors_available?: boolean;
  reproduction_package_from_scratch?: string;
  outputs?: outputs;
  original_reproduction_packages?: original_reproduction_packages[];
  revised_reproduction_packages?: revised_reproduction_packages;
  project_nickname?: string;
  will_assess_whole_paper?: string;
};
