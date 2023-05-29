"use client";

import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import Heading from "../navbar/Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  FormProvider,
  Controller,
} from "react-hook-form";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";
import ImagesUpload from "../inputs/ImagesUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export interface CreateListingData {
  category: string;
  location: null | CountrySelectValue;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  price: number;
  title: string;
  description: string;
}

const RentModal: React.FC = () => {
  const rentModal = useRentModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [image, setImage] = useState<null | File>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
    getValues,
    control,
  } = useForm<CreateListingData>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      price: 1,
      title: "",
      description: "",
    },
  });

  const setCustomValue = (id: keyof CreateListingData, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onNext = () => {
    setStep((prev) => prev + 1);
  };
  const onPrev = () => {
    setStep((prev) => prev - 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.PRICE) {
      onNext();
      return;
    }

    setIsLoading(true);

    try {
      let formData = new FormData();
      formData.append("file", image as File);
      formData.append("data", JSON.stringify(data));

      await axios.request<string>({
        method: "POST",
        url: "/api/create-listing",
        data: formData,
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      toast.success("Listing created");
      router.refresh();
      reset();
      setImage(null);
      setStep(STEPS.CATEGORY);
      rentModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
        loading: () => (
          <div className="h-[35vh] flex justify-center items-center">
            Loading...
          </div>
        ),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [watch("location")]
  );

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describe your place?"
        subTitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={watch("category") === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subTitle="Help guests find you!"
        />
        <CountrySelect
          onChange={(value) => setCustomValue("location", value)}
          value={watch("location")}
        />
        <Map center={watch("location")?.latlng} />
      </div>
    );
  }
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subTitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={watch("guestCount")}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you allow?"
          value={watch("roomCount")}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you allow?"
          value={watch("bathroomCount")}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }
  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subTitle="Show guests what your place looks up"
        />
        <ImagesUpload onChange={(img: File) => setImage(img)} value={image} />
      </div>
    );
  }
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subTitle="Short and sweet works best"
        />
        <Controller
          control={control}
          name="title"
          key="title"
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              {...field}
              id="title"
              label="Tile"
              disabled={isLoading}
              errors={errors}
            />
          )}
        />

        <hr />
        <Controller
          control={control}
          name="description"
          key="description"
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              {...field}
              id="description"
              label="Description"
              disabled={isLoading}
              errors={errors}
            />
          )}
        />
      </div>
    );
  }
  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Set your price"
          subTitle="How match do you charge per night?"
        />
        <Controller
          control={control}
          rules={{ required: true }}
          name="price"
          key="price"
          render={({ field }) => (
            <Input
              {...field}
              id="price"
              label="Price"
              formatPrice={true}
              type="number"
              disabled={isLoading}
              errors={errors}
            />
          )}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      title="Airbnb your home"
      onClose={rentModal.onClose}
      actionLabel={actionLabel}
      secondaryLabel={secondaryActionLabel}
      secondaryAction={secondaryActionLabel ? onPrev : undefined}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default RentModal;
