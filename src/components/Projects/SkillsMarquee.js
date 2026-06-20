"use client";

import { AzureIcon, AwsIcon, TerraformIcon, DockerIcon, OpenShiftIcon, AzureDevOpsIcon, AnsibleIcon, GithubIcon } from '../Header/Icons';
import React from "react";

const SkillsMarquee = () => {
  return (
    <section className="py-6 bg-gray-800 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-base font-bold mb-2 uppercase">Skills</h2>
        <div className="relative w-full overflow-hidden">
          <div className="flex items-center animate-marquee space-x-3">
            <AzureIcon className="w-5 h-5" />
            <AwsIcon className="w-5 h-5" />
            <TerraformIcon className="w-5 h-5" />
            <DockerIcon className="w-5 h-5" />
            <OpenShiftIcon className="w-5 h-5" />
            <AzureDevOpsIcon className="w-5 h-5" />
            <GithubIcon className="w-5 h-5" />
            <AnsibleIcon className="w-5 h-5" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsMarquee;
