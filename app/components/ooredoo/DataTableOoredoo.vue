<template>
    <div>
      <UiDatatable :options="options" :columns="columns" :data="users">
        <template #actions="{ cellData }: { cellData: Staff }">
          <UiButton
            class="h-7 text-xs"
            size="sm"
            @click.stop="
              useSonner('Editing...', {
                description: `You are editing the user ${cellData?.name}.`,
              })
            "
            >Edit</UiButton
          >
        </template>
      </UiDatatable>
    </div>
  </template>
  
  <script lang="ts" setup>
    import { faker } from "@faker-js/faker";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    import type { DataTablesNamedSlotProps } from "~/components/Ui/Datatable.client.vue";
    import type { Config, ConfigColumns } from "datatables.net";
  
    interface Staff {
      name: string;
      position: string;
      office: string;
      age: number;
      start_date: string;
      salary: string;
    }
  
    const { data: users } = await useAsyncData<Staff[]>(
      "fakerUsers",
      () => {
        return new Promise((resolve) => {
          // create 1000 fake users
          const users = Array.from({ length: 1000 }, () => {
            return {
              name: faker.person.fullName(),
              position: faker.person.jobTitle(),
              office: faker.location.city(),
              age: faker.number.int(100),
              start_date: useDateFormat(faker.date.past().toISOString(), "MMMM DD, YYYY").value,
              salary: faker.finance.amount({ symbol: "$" }),
            };
          });
          resolve(users);
        });
      },
      { default: () => [] }
    );
  
    const columns: ConfigColumns[] = [
      { data: "name", title: "Id" },
      { data: "position", title: "Status" },
      { data: "office", title: "Utilisateur" },
      { data: "age", title: "Platforme Service" },
      { data: "salary", title: "Description" },

      { data: "start_date", title: "Date D'ajout" },
      {
        data: null,
        title: "",
        className: "no-export",
        searchable: false,
        orderable: false,
        name: "actions",
        render: "#actions",
        responsivePriority: 1,
      },
    ];
  
    const options: Config = {
      buttons: [
        {
          extend: "colvis",
          text: "Columns",
          columns: ":not(.no-export)",
        },
        "copy",
        "excel",
        "pdf",
        "print",
        "csv",
      ],
      dom: "Q<'flex flex-col lg:flex-row w-full lg:items-start lg:justify-between gap-5 mb-5'Bf><'border rounded-lg't><'flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between pt-3 p-5'li><''p>",
      responsive: true,
      autoWidth: true,
      select: true,
    };
  </script>
  