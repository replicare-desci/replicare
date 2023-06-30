import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { UserContext } from "../../context/ContextProvider";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { appendUserPaperData } from "../../firebase/firebaseFunctions";
import { toast } from "react-toastify";
const userID: string = sessionStorage.getItem("id") ?? "";

const DeclareRobustnessChecksStepFour = () => {
  const navigate = useNavigate();
  const { pageType, userPaperID } = useParams();
  const { store, setStore } = UserContext();

  const DeclareRobustnessChecksHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setStore((prev: any) => ({
      ...prev,
      paperData: {
        ...prev.paperData,
        [name]: value,
      },
    }));
  };
  function changeWorkFlowStage(userPaperID: string) {
    if (userPaperID && typeof userPaperID !== "undefined") {
      setStore((prev: any) => {
        return {
          ...prev,
          paperData: {
            ...prev.paperData,
            workflow_stage: "assessment",
            paper_type: "scoping",
          },
        };
      });
      const response: boolean = window.confirm(
        "Are you sure you want to move to next stage? Changes can't be allowed after this step"
      );

      if (
        store?.paperData?.paper_type === "scoping" &&
        store?.paperData?.workflow_stage === "assessment" &&
        response
      ) {
        setStore((prev: any) => {
          return {
            ...prev,
            paperData: {
              ...prev.paperData,
              userID: userID,
              id: userPaperID,
            },
          };
        });

        appendUserPaperData(userPaperID, store?.paperData)
          .then(() => {
            toast.success("Scoping submitted successfully");

            navigate(`/reproductions/edit/${userPaperID}`);
          })
          .catch((err) => {
            console.log("Error submitting data", err);
          });
      } else {
        toast.error("Save before submitting");
      }
    } else {
      toast.error("ID not defined");
      console.log("userPaperID not defined");
    }
  }
  return (
    <Box boxShadow={1} border={1} my={4} p={4}>
      <Typography variant="h5" fontWeight={600}>
        Declare possible robustness checks
      </Typography>
      <FormControl sx={{ my: 3 }}>
        <FormLabel>
          <b>4.1. </b>After reading the paper, you may wonder what the results
          would look like under a specific robustness check. If you think that
          such analysis could have been done within the same methodology and
          using the same data (e.g., by including or excluding a subset of the
          data like “high-school dropouts” or “women”), please specify a
          robustness test that you would like to conduct as part of this
          project.
        </FormLabel>
        <TextField
          sx={{ my: 1 }}
          required
          onChange={DeclareRobustnessChecksHandler}
          value={store?.paperData?.possible_robustness_checks}
          name="possible_robustness_checks"
          multiline
          rows={5}
          fullWidth
          placeholder="Possible robustness check"
        />
      </FormControl>
      {/* TODO: need to do this  */}
      <Button
        variant="contained"
        onClick={() => (userPaperID ? changeWorkFlowStage(userPaperID) : null)}
      >
        Save and move to assessment stage
      </Button>
    </Box>
  );
};

export default DeclareRobustnessChecksStepFour;
