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
export type data_source_rows = {
  cited?: boolean;
  data_files?: string;
  data_source?: string;
  id?: number;
  location?: string;
  notes?: string;
  page_provided?: string;
};
export type analytic_data_rows = {
  analytic_data?: string;
  description?: string;
  id?: number;
  location?: string;
};
export type code_scripts_rows = {
  id: number;
  description: string;
  file_name: string;
  inputs: ?string;
  location: string;
  outputs: ?string;
  primary_types?: string;
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

  data_source_rows?: data_source_rows[];
  analytic_data_rows?: analytic_data_rows[];
  code_scripts_rows?: code_scripts_rows[];

  master_file_exists?: string;

  master_file_one_click?: string;

  master_file_no_one_click_reasons?: string[];

  // 4.4.1
  num_minutes_installing_additional_package?: string;
  // 4.4.2
  num_minutes_changing_directory_paths?: string;
  // 4.4.3
  num_minutes_other_improvements?: string;

  master_file_run_after_corrections?: string;

  // 6.1
  reproduction_package_tool?: string[];
};
