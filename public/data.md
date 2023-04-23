// initial state

```json
authors_available: ""
authors_contacted: ""
authors_response: []
created_at: "2023-04-15T13:07:59.254Z"
familiarity_level: ""
id: "1187"
is_author: "true"
is_creator: "true"
outputs: "{attempt_all_inline_results_body: "",
 attempt_all_tables_appendix: "",
…
}"
attempt_all_figures_appendix: ""
attempt_all_inline_results_body: ""
attempt_all_tables_appendix: ""
paper_type: "candidate"
reproduction_package_available: ""
reproduction_package_from_scratch: ""
shareable_link: false
will_assess_whole_paper: ""
workflow_stage: "select_paper"
```

<!-- state after select a paper all data save -->

```json Additional_population:""
author_did_not_respond_as_of_date:"2012-12-11T18:30:00.000Z"
authors_available:"true"
authors_contacted:"true"
authors_response:"["Provided reproduction package.",
…]0:"
"Provided reproduction package."1:
"Declined to share reproduction package,
 citing legal or ethical reasons."2:"Declined to share reproduction package but did not provide a reason."3:
"no_longer_have_access"4:
"Shared detailed instructions on how to access the data (for restricted access only)."5:
"Did not respond."6:
"Other (explain briefly)":"declined_not_ready"
authors_response_not_ready_date:"2012-10-11T18:30:00.000Z"
authors_response_other:"23"
claim_type:""
claim_type_other_description:""
created_at:"2023-04-15T13:07:59.254Z"
expected_total_hours:1
familiarity_level:""
is_author:"true"
is_creator:"true"
original_reproduction_packages:
"[{id: 2307,
 stage: "original",
 content_type: "code",
 name: "123",
 url: "23"}]0:
{id: 2307,
 stage: "original",
 content_type: "code",
 name: "123",
 url: "23"}"
outputs:"{attempt_all_inline_results_body: "",
 attempt_all_tables_appendix: "",
…}"
attempt_all_figures_appendix:""
attempt_all_inline_results_body:""
attempt_all_tables_appendix:""
paper:"{title: "Transport Innovation and Economic Growth: Professor Fogel on and off the Rails",
…}"
authors:"Paul A. David"
doi:"10.2307/2594124"
publication_name:"The Economic History Review"
publication_year:"1969"
title:"Transport Innovation and Economic Growth: Professor Fogel on and off the Rails"
paper_type:"candidate"
possible_robustness_checks:""
project_nickname:""
reproduction_package_available:"false"
reproduction_package_from_scratch:""
revised_reproduction_packages:"[{id: 2306,
 stage: "revised",
 content_type: "code",
 name: "",
 url: ""}]"
shareable_link:false
start_date:"2023-04-15T13:17:22.572Z"
summary:""
whole_population:""
will_assess_whole_paper:""
workflow_stage:"select_paper"
```

<!-- after declaring workflow_stage changes from select-paper to scoping and paper_type changes from candidate to declared  -->

<!-- after scoping step1 -->

````json
{
  "project_nickname":"asdfg",

  "created_at":"2023-04-15T13:07:59.254Z",

  "authors_response":[
    "Provided reproduction package.",

    "Declined to share reproduction package,
 citing legal or ethical reasons.",
"Declined to share reproduction package but did not provide a reason.",
"no_longer_have_access",

    "Shared detailed instructions on how to access the data (for restricted access only).",

    "Did not respond.",

    "Other (explain briefly)",
"declined_not_ready"
    ],

  "authors_response_other":"23",
"authors_response_not_ready_date":"2012-10-11T18:30:00.000Z",
"expected_total_hours":1,

  "num_claims":1,

  "claim_type":"descriptive",

  "claim_type_other_description":"",

  "num_claims_will_assess":1,
"
  paper_type":"declared",

  "workflow_stage":"scoping",

  "author_did_not_respond_as_of_date":"2012-12-11T18:30:00.000Z",
"start_date":"2023-04-15T13:17:22.572Z",

  "end_date":"2022-10-11T18:30:00.000Z",

  "summary":"evas",

  "whole_population":"low",

  "additional_population":"inc0",

  "possible_robustness_checks":"",

  "reproduction_package_available":"false",

  "authors_contacted":"true",

  "authors_available":"true",

  "reproduction_package_from_scratch":"",

  "will_assess_whole_paper":"true",

  "familiarity_level":"1",

  "outputs":
    {
      "attempt_all_inline_results_body":"",

      "attempt_all_tables_appendix":"",

      "attempt_all_figures_appendix":""
    },

//     "paper":
//       {
//         "title":"Transport Innovation and Economic Growth: Professor Fogel on and off the Rails",

//         "publication_name":"The Economic History Review",

// "publication_year":"1969",
// "doi":"10.2307/2594124",
// "authors":"Paul A. David"},
// "original_reproduction_packages":[{"id":2307,
// "stage":"original",
// "content_type":"code",
// "name":"123",
// "url":"23"}],
// "revised_reproduction_packages":[{"id":2306,
// "stage":"revised",
// "content_type":"code",
// "name":"",
// "url":""}],
"claims":[{
  "id":1536,
  "short_description":"",

  "claim_summary":"",

  "identified_preferred_specification":"",

  "econometric_categorization_confidence":"",

  "focused_population":"",

  "estimates":[
    {
      "id":8495,
      "name":"",
      "estimate":"",

      "standard_error":"",

      "units":"",
      "p_value":"",
      "confidence_interval":"",

      "other_statistic":"",

      "page":"",
      "column":"",
      "row":"",
      "inline_paragraph":"",

      "econometric_method":"",

      "other_econometric_method":""
    },
    {
      "id":8496,
    "name":"",

    "estimate":"",
    "standard_error":"",

    "units":"",
    "p_value":"",
    "confidence_interval":"",

    "other_statistic":"",
    "page":"",
    "column":"",

    "row":"",
    "inline_paragraph":"",
    "econometric_method":"",

    "other_econometric_method":""
    },
    {"id":8497,
    "name":"",
    "estimate":"",

    "standard_error":"",
    "units":"",
    "p_value":"",
    "confidence_interval":"",
    "other_statistic":"",

    "page":"",
    "column":"",
    "row":"",
    "inline_paragraph":"",
    "econometric_method":"",
    "other_econometric_method":""},
    {"id":8498,
    "name":"",
    "estimate":"",
    "standard_error":"",
    "units":"",
    "p_value":"",
    "confidence_interval":"",
    "other_statistic":"",
    "page":"",
    "column":"",
    "row":"",
    "inline_paragraph":"",
    "econometric_method":"",
    "other_econometric_method":""},

    {"id":8499,
    "name":"",
    "estimate":"",
    "standard_error":"",
    "units":"",
    "p_value":"",
    "confidence_interval":"",
    "other_statistic":"",
    "page":"",
    "column":"",
    "row":"",
    "inline_paragraph":"",
    "econometric_method":"",
    "other_econometric_method":""},

    {"id":8500,
    "name":"",
    "estimate":"",
    "standard_error":"",
    "units":"",
    "p_value":"",
    "confidence_interval":"",
    "other_statistic":"",
    "page":"",
    "column":"",
    "row":"",
    "inline_paragraph":"",
    "econometric_method":"",
    "other_econometric_method":""}
    ]}],
"is_creator":"true",
"is_author":"true",
"shareable_link":false
}```

// opuputs data changes
// outputs
// :
// {num_tables_body: 123,
 num_tables_appendix: 176,
 num_figures_body: 145,paper
 num_figures_appendix: 1689,…}
// attempt_all_figures_appendix
// :
// "true"
// attempt_all_inline_results_body
// :
// "true"
// attempt_all_tables_appendix
// :
// "true"
// num_figures_appendix
// :
// 1689
// num_figures_body
// :
// 145
// num_inline_results_body
// :
// 167
// num_tables_appendix
// :
// 176
// num_tables_body
// :
// 123

// after step2

// revised_reproduction_packages
// :
// [{id: 2306,
 stage: "revised",
 content_type: "code",
 name: "984dsfd",
 url: "845tfgvhj"}]
// 0
// :
// {id: 2306,
 stage: "revised",
 content_type: "code",
 name: "984dsfd",
 url: "845tfgvhj"}
// content_type
// :
// "code"
// id
// :
// 2306
// name
// :
// "984dsfd"
// stage
// :
// "revised"
// url
// :
// "845tfgvhj"
````
