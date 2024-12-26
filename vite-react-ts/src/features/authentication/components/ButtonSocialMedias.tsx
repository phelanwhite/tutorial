import { useAuthStore } from "@/features/authentication/stores/auth.store";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import React, { memo, useState } from "react";

const ButtonSocialMedias = () => {
  const { signinWithSocialMedia, signinPassportSuccess, signout, user } =
    useAuthStore();

  const [click, setClick] = useState(false);

  const handleLoginWithGoogle = () => {
    signinWithSocialMedia("google");
    setClick(true);
  };
  const handleLoginWithGithub = () => {
    signinWithSocialMedia("github");
    setClick(true);
  };
  const signinPassportSuccessResult = useQuery({
    queryKey: ["passport", "success"],
    queryFn: async () => {
      const response = await signinPassportSuccess();
      setClick(false);
      return response.data;
    },
    enabled: click,
  });

  return (
    <>
      {signinPassportSuccessResult.isLoading && <div>Loading...</div>}
      <div className="flex gap-4">
        <Button type="primary" onClick={handleLoginWithGoogle}>
          Sigin with google
        </Button>
        <Button type="primary" onClick={handleLoginWithGithub}>
          Sigin with github
        </Button>
        <Button type="primary" onClick={signout}>
          Sigout
        </Button>
        <span>Hello: {user?.name}</span>
      </div>
    </>
  );
};

export default memo(ButtonSocialMedias);
