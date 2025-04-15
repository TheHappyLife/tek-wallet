"use client";
import { GeneralProps } from "../../../types/ui";
import DefaultPageLayout from "../../../components/layouts/DefaultPageLayout";
import SwiperControlled, {
  SwiperControlledRef,
} from "../../../components/ui/SwiperControlled";
import { SwiperSlide } from "swiper/react";
import ChildPageLayout, {
  ChildPageLayoutRef,
} from "../../../components/layouts/ChildPageLayout";
import PageHeader from "../../../components/ui/PageHeader";
import { useRef, useState } from "react";
import Text from "../../../components/ui/Text";
import Button from "../../ui/Button";
import { Box, TextareaAutosize } from "@mui/material";
import useWalletData from "../../../hooks/useWalletData";
interface ImportWalletViewProps extends GeneralProps {
  onBack: () => void;
}

export enum ImportWalletViewStep {
  CREATE_PASSCODE = 0,
  CONFIRM_PASSCODE = 1,
}

const ImportWalletView = (props: ImportWalletViewProps) => {
  const [seedPhrase, setSeedPhrase] = useState("");
  const swiperControlledRef = useRef<SwiperControlledRef>(null);
  const childPageLayoutRef = useRef<ChildPageLayoutRef>(null);
  const { importWallet } = useWalletData();
  const handleChangeSeedPhrase = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setSeedPhrase(event.target.value);
  };

  const handleImportWalletError = () => {
    childPageLayoutRef.current?.showError();
    setTimeout(() => {
      childPageLayoutRef.current?.showNormal();
    }, 1500);
  };

  const handleImportWallet = async () => {
    childPageLayoutRef.current?.showLoading();
    await importWallet(
      {
        seed_pharse: seedPhrase,
        app_slugs: [process.env.NEXT_PUBLIC_TEK_WALLET_APP_SLUG || ""],
      },
      () => {
        childPageLayoutRef.current?.showLoading();
      },
      () => {
        childPageLayoutRef.current?.showSuccess();
      },
      handleImportWalletError
    );
  };

  return (
    <ChildPageLayout
      ref={childPageLayoutRef}
      header={
        <PageHeader
          overrideBack={props.onBack}
          title="Import wallet"
        ></PageHeader>
      }
    >
      <DefaultPageLayout
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          height: "100%",
          ...props.sx,
        }}
      >
        <SwiperControlled
          ref={swiperControlledRef}
          disableSwipe
          sx={{ height: "100%" }}
        >
          <SwiperSlide>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                gap: "1rem",
              }}
            >
              <Text
                sx={{
                  color: "text.white",
                  fontWeight: "500",
                  fontSize: "16px",
                }}
              >
                Your seed phrase
              </Text>
              <Box
                sx={{
                  width: "100%",
                  height: "fit-content",
                }}
              >
                <TextareaAutosize
                  value={seedPhrase}
                  onChange={handleChangeSeedPhrase}
                  minRows={8}
                  maxRows={8}
                  placeholder="Enter your seed phrase"
                  style={{
                    width: "100%",
                    backgroundColor: "ui.background.primary",
                    borderRadius: "lg",
                    padding: "1rem",
                    color: "text.white",
                  }}
                />
              </Box>
              <Text className="text-ui-text-white font-400 text-13 text-center">
                Your seed phrase is a list of words that are used to create your
                wallet. It is important to keep it safe and private.
              </Text>
              <Button.Primary
                sx={{ width: "100% !important", marginTop: "auto" }}
                onClick={handleImportWallet}
              >
                Import
              </Button.Primary>
            </Box>
          </SwiperSlide>
        </SwiperControlled>
      </DefaultPageLayout>
    </ChildPageLayout>
  );
};
export default ImportWalletView;
