<template>
  <div class="items-center justify-center p-4">
    <div class="text-center">
      <h2 class="text-2xl font-bold mb-4 text-teal-800">
        {{ project.name }}
      </h2>

      <p
        class="mb-4"
        style="color:rgb(42, 75, 79); font-size: 13px;"
      >
        {{ project.description }}
      </p>


      <form
        class="flex items-center justify-center"
        @submit.prevent="fetchArticles"
      >
        <label
          for="simple-search"
          class="sr-only"
        >Search</label>
        <div class="relative w-[42rem]">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <input
            v-model="researchQuestion"
            type="text"
            style="background: #f8f8f7"
            class="border text-gray-600 focus:bg-transparent text-sm rounded-lg hover:cursor-pointer focus:ring-teal-800 hover:ring-teal-800 hover:border-teal-800 focus:border-teal-800 block w-full pl-10 p-2.5 border-gray-300 placeholder-gray-500"
            placeholder="Ask a research question"
            required
          >
        </div>
        <button
          type="submit"
          class="p-2.5 ml-2 text-sm font-medium text-white bg-teal-800 hover:bg-teal-700 rounded-lg border focus:ring-4 focus:outline-none focus:ring-teal-600"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
    </div>

    <div
      v-show="loading"
      class="fixed inset-0 flex items-center justify-center"
    >
      <div
        style="border-top-color:transparent"
        class="w-8 h-8 border-4 border-teal-700 rounded-full animate-spin"
      />
      <p class="text-sm font-medium ml-2 text-teal-800">
        Fetching Articles...
      </p>
    </div>

    <div
      v-show="notFound"
      class="flex flex-col items-center py-20 text-sm leading-6 text-teal-900 md:py-32 lg:py-40"
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        class="w-8 h-8"
      ><path
        d="m13 13 6 6m0-6-6 6m15-3c0 6.627-5.373 12-12 12S4 22.627 4 16 9.373 4 16 4s12 5.373 12 12Z"
        stroke="#CBD5E1"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      </svg>
      <p class="mt-6">
        We’re sorry we don’t have articles for the research question
        <!-- <span class="font-semibold text-slate-900"></span>. -->
      </p>
      <!-- <p class="mt-1">
        If you can’t find what you’re looking for 
        <a
          class="font-semibold text-violet-600"
          href="https://github.com/tailwindlabs/heroicons/discussions/new?category=ideas"
        >make a suggestion on GitHub.
        </a>
      </p> -->
    </div>

    <div
      v-if="articles.length > 0"
      class="mt-20 shadow-common border border-stone-200 !overflow-hidden rounded-lg w-full"
    >
      <div class="flex flex-col overflow-x-clip bg-white">
        <div
          class="flex gap-2 items-center px-3 py-2 border-b shadow-[0px_-2px_8px_rgba(76,21,6,0.03)] border-stone-200"
        >
          <div class="flex flex-grow gap-2 min-w-fit pr-2 justify-start">
            <button
              type="button"
              class="text-sm rounded-md bg-white border border-gray-200 text-gray-600 shadow-sm py-2 px-2 pl-2 pr-3"
            >
              <span class="inline-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-4 w-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"
                  />
                </svg>

              </span>
              Sort: Most relevant
            </button>
            <!-- class="sticky bottom-5 text-gray-200 mt-5 rounded-lg bg-teal-800 hover:bg-teal-700 z-30 h-[54px] items-center hidden sm:flex justify-center left-[calc(50%-150px)] shadow-[0px_1px_2px_rgba(137,93,72,0.3),0px_6px_12px_rgba(137,93,72,0.3),0px_8px_20px_rgba(137,93,72,0.3)] group" -->
    
            <button
              type="button"
              class="text-sm rounded-md bg-white border border-gray-200 text-gray-600 shadow-sm py-2 px-2 pl-2 pr-3"
            >
              <span class="inline-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-4 w-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
                  />
                </svg>

              </span>
              Filters
            </button>
            <!-- <div>
              <div class="cursor-pointer">
                <div>
                  <button
                    id="menu-button-:r1k:"
                    type="button"
                    class="chakra-button chakra-menu__menu-button bg-white flex flex-row emotion-css-cache-1kaxpuk"
                    aria-expanded="false"
                    aria-haspopup="menu"
                    aria-controls="menu-list-:r1k:"
                    style="padding-left: 0.75rem; padding-right: 0.5rem;"
                  >
                    <span class="emotion-css-cache-xl71ch"><span>Export as</span></span><span class="chakra-button__icon emotion-css-cache-1hzyiq5"><div
                      class="flex flex-row items-center"
                      aria-hidden="true"
                      focusable="false"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    ><rect
                      width="256"
                      height="256"
                      fill="none"
                    /><polyline
                      points="208 96 128 176 48 96"
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="16"
                    /></svg><div class="bg-forest-200 rounded-4 uppercase text-xs font-bold text-forest-800 px-1.5 py-1 ml-2 -mr-0.5 inline-block pointer-events-none">Upgrade</div></div></span>
                  </button>
                </div>
              </div>
            </div> -->
            <div class="text-sm flex gap-2 items-center ml-2">
              <div class="flex gap-2 items-center rounded-full px-3 pl-2 py-1 bg-stone-100 border border-stone-200 w-auto h-8 transition-all duration-120 ease-in-out">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-4 w-4 text-teal-900"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>

                <div><span class="text-teal-700 font-medium">{{ articles.length }}</span></div>
              </div>
            </div>
          </div>
          <button
            v-show="showTable && narrativeGenerated && showViewNarrativeAnalysisButton"
            type="button"
            class="mx-10 text-sm rounded-md bg-teal-800 hover:bg-teal-700 border border-gray-200 text-gray-200 shadow-sm py-1 px-2 pl-2 pr-3"
  
            @click="openViewAnalysisModal = true;"
          >
            <div class="flex items-center gap-2 p-1 rounded">
              <p class="text-sm font-semibold">
                View Narrative Analysis
              </p>
            </div>
          </button>
          <!-- <button
            type="button"
            class="chakra-button emotion-css-cache-1vvyfns"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 256 256"
              class="rotate-180"
              aria-hidden="true"
              focusable="false"
            >
              <rect
                width="256"
                height="256"
                fill="none"
              />
              <line
                x1="88"
                y1="48"
                x2="88"
                y2="208"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              />
              <rect
                x="32"
                y="48"
                width="192"
                height="160"
                rx="8"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              />
            </svg>
          </button>
          <button
            type="button"
            class="chakra-button hidden sm:block pl-[6px] emotion-css-cache-1vvyfns"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 256 256"
              aria-hidden="true"
              focusable="false"
            >
              <rect
                width="256"
                height="256"
                fill="none"
              />
              <polyline
                points="168 48 208 48 208 88"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              />
              <line
                x1="152"
                y1="104"
                x2="208"
                y2="48"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              />
              <polyline
                points="88 208 48 208 48 168"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              />
              <line
                x1="104"
                y1="152"
                x2="48"
                y2="208"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              />
              <polyline
                points="208 168 208 208 168 208"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              />
              <line
                x1="152"
                y1="152"
                x2="208"
                y2="208"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              />
              <polyline
                points="48 88 48 48 88 48"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              />
              <line
                x1="104"
                y1="104"
                x2="48"
                y2="48"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              />
            </svg>
          </button> -->
        </div>
        <div class="flex h-[80vh]">
          <div class="flex-grow overflow-hidden shadow-inner flex flex-col">
            <div class="h-full overflow-auto">
              <table class="w-full border-separate border-spacing-0 table-fixed">
                <thead class="flex-shrink-0 text-sm font-semibold bg-stone-50">
                  <tr>
                    <th
                      style="font-size:13px;"
                      class="bg-stone-50 md:w-[400px] py-1 text-stone-700 font-normal h-8 w-[400px] pl-[17px] border-b border-r"
                    >
                      <div class="gap-2 flex w-auto items-center h-8">
                        <label
                          class="chakra-checkbox hidden sm:inline-flex mr-[10px] hover:opacity-100 hover:border-stone-300 hover:shadow-sm transition-all duration-300 emotion-css-cache-1577qb8"
                        ><input
                          type="checkbox"
                          value=""
                          style="border: 0px; clip: rect(0px, 0px, 0px, 0px); height: 1px; width: 1px; margin: -1px; padding: 0px; overflow: hidden; white-space: nowrap; position: absolute;"
                        ><span
                          aria-hidden="true"
                        /></label>
                        <div class="flex grow">
                          Article
                        </div>
                      </div>
                    </th>
                    <th
                      style="font-size:13px;"
                      class="bg-stone-50 md:w-[400px] py-1 text-stone-700 font-normal h-8 w-[400px] pl-[17px] border-b border-r"
                    >
                      <div class="gap-2 flex w-auto items-center h-8">
                        <div class="flex grow">
                          Description 
                        </div>
                      </div>
                    </th>
                    <th
                      style="font-size:13px;"
                      class="bg-stone-50 md:w-[400px] py-1 text-stone-700 font-normal h-8 w-[400px] pl-[17px] border-b border-r"
                    >
                      <div class="gap-2 flex w-auto items-center h-8">
                        <div class="flex grow">
                          Abstract summary
                        </div>
                        <div>
                          <div class="cursor-pointer">
                            <button
                              type="button"
                              class="chakra-button group hover:bg-forest-100 -mr-1.5 emotion-css-cache-1vvyfns"
                              aria-label="Turn on high accuracy"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                viewBox="0 0 256 256"
                                class="!text-stone-400 group-hover:!text-forest-500 transition-colors duration-300"
                                aria-hidden="true"
                                focusable="false"
                              >
                                <rect
                                  width="256"
                                  height="256"
                                  fill="none"
                                />
                                <line
                                  x1="128"
                                  y1="128"
                                  x2="224"
                                  y2="32"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="16"
                                />
                                <path
                                  d="M195.9,60.1a96.2,96.2,0,1,0,18.7,26.5"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="16"
                                />
                                <path
                                  d="M161.9,94.1a47.9,47.9,0,1,0,14,31.2"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div class="flex-none">
                          <button
                            id="popover-trigger-:r1v:"
                            type="button"
                            class="chakra-button hover:bg-forest-100 group mr-2 emotion-css-cache-1vvyfns"
                            aria-label="Column actions"
                            aria-haspopup="dialog"
                            aria-expanded="false"
                            aria-controls="popover-content-:r1v:"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              viewBox="0 0 256 256"
                              class="!text-stone-400 group-hover:!text-forest-500"
                              aria-hidden="true"
                              focusable="false"
                            >
                              <rect
                                width="256"
                                height="256"
                                fill="none"
                              />
                              <polyline
                                points="208 96 128 176 48 96"
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </th>

                    <th
                      v-show="narrativeGenerated"
                      style="font-size:13px;"
                      class="text-left bbg-stone-50 md:w-[400px] py-1 text-stone-700 font-normal h-8 w-[400px] pl-[17px] border-b border-r"
                    >
                      <div class="flex items-center gap-2 w-auto h-8">
                        <div class="flex-grow">
                          Narrative
                        </div>
                        <div>
                          <div class="cursor-pointer">
                            <button
                              type="button"
                              class="group hover:bg-forest-100 -mr-1.5"
                              aria-label="Turn on high accuracy"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                viewBox="0 0 256 256"
                                class="text-stone-400 group-hover:text-forest-500 transition-colors duration-300"
                                aria-hidden="true"
                                focusable="false"
                              >
                                <rect
                                  width="256"
                                  height="256"
                                  fill="none"
                                />
                                <line
                                  x1="128"
                                  y1="128"
                                  x2="224"
                                  y2="32"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="16"
                                />
                                <path
                                  d="M195.9,60.1a96.2,96.2,0,1,0,18.7,26.5"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="16"
                                />
                                <path
                                  d="M161.9,94.1a47.9,47.9,0,1,0,14,31.2"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div class="flex-none">
                          <button
                            id="popover-trigger-:r25:"
                            type="button"
                            class="group hover:bg-forest-100 mr-2"
                            aria-label="Column actions"
                            aria-haspopup="dialog"
                            aria-expanded="false"
                            aria-controls="popover-content-:r25:"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              viewBox="0 0 256 256"
                              class="text-stone-400 group-hover:text-forest-500"
                              aria-hidden="true"
                              focusable="false"
                            >
                              <rect
                                width="256"
                                height="256"
                                fill="none"
                              />
                              <polyline
                                points="208 96 128 176 48 96"
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </th>

                    <th
                      v-show="narrativeGenerated"
                      style="font-size:13px;"
                      class="text-left bbg-stone-50 md:w-[400px] py-1 text-stone-700 font-normal h-8 w-[400px] pl-[17px] border-b border-r"
                    >
                      <div class="flex items-center gap-2 w-auto h-8">
                        <div class="flex-grow">
                          Dominance
                        </div>
                        <div>
                          <div class="cursor-pointer">
                            <button
                              type="button"
                              class="group hover:bg-forest-100 -mr-1.5"
                              aria-label="Turn on high accuracy"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                viewBox="0 0 256 256"
                                class="text-stone-400 group-hover:text-forest-500 transition-colors duration-300"
                                aria-hidden="true"
                                focusable="false"
                              >
                                <rect
                                  width="256"
                                  height="256"
                                  fill="none"
                                />
                                <line
                                  x1="128"
                                  y1="128"
                                  x2="224"
                                  y2="32"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="16"
                                />
                                <path
                                  d="M195.9,60.1a96.2,96.2,0,1,0,18.7,26.5"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="16"
                                />
                                <path
                                  d="M161.9,94.1a47.9,47.9,0,1,0,14,31.2"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div class="flex-none">
                          <button
                            id="popover-trigger-:r25:"
                            type="button"
                            class="group hover:bg-forest-100 mr-2"
                            aria-label="Column actions"
                            aria-haspopup="dialog"
                            aria-expanded="false"
                            aria-controls="popover-content-:r25:"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              viewBox="0 0 256 256"
                              class="text-stone-400 group-hover:text-forest-500"
                              aria-hidden="true"
                              focusable="false"
                            >
                              <rect
                                width="256"
                                height="256"
                                fill="none"
                              />
                              <polyline
                                points="208 96 128 176 48 96"
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </th>

                    <th
                      v-show="narrativeGenerated"
                      style="font-size:13px;"
                      class="text-left bbg-stone-50 md:w-[400px] py-1 text-stone-700 font-normal h-8 w-[400px] pl-[17px] border-b border-r"
                    >
                      <div class="flex items-center gap-2 w-auto h-8">
                        <div class="flex-grow">
                          Evolution
                        </div>
                        <div>
                          <div class="cursor-pointer">
                            <button
                              type="button"
                              class="group hover:bg-forest-100 -mr-1.5"
                              aria-label="Turn on high accuracy"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                viewBox="0 0 256 256"
                                class="text-stone-400 group-hover:text-forest-500 transition-colors duration-300"
                                aria-hidden="true"
                                focusable="false"
                              >
                                <rect
                                  width="256"
                                  height="256"
                                  fill="none"
                                />
                                <line
                                  x1="128"
                                  y1="128"
                                  x2="224"
                                  y2="32"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="16"
                                />
                                <path
                                  d="M195.9,60.1a96.2,96.2,0,1,0,18.7,26.5"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="16"
                                />
                                <path
                                  d="M161.9,94.1a47.9,47.9,0,1,0,14,31.2"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div class="flex-none">
                          <button
                            id="popover-trigger-:r25:"
                            type="button"
                            class="group hover:bg-forest-100 mr-2"
                            aria-label="Column actions"
                            aria-haspopup="dialog"
                            aria-expanded="false"
                            aria-controls="popover-content-:r25:"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              viewBox="0 0 256 256"
                              class="text-stone-400 group-hover:text-forest-500"
                              aria-hidden="true"
                              focusable="false"
                            >
                              <rect
                                width="256"
                                height="256"
                                fill="none"
                              />
                              <polyline
                                points="208 96 128 176 48 96"
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody class="flex-grow overflow-y-auto">
                  <tr
                    v-for="(article, index) in articles"
                    :key="index"
                    class="group h-8"
                  >
                    <td
                      role="cell"
                      class="align-top h-full relative bg-white group-hover:bg-stone-50 border-stone-200 border-b border-r"
                    >
                      <div class="flex flex-row h-full pl-1">
                        <div class="p-3 pt-4 hidden sm:block">
                          <label
                            class="chakra-checkbox opacity-70 group-hover:opacity-100 group-hover:border-stone-300 group-hover:shadow-sm transition-all duration-300 emotion-css-cache-1577qb8"
                          ><input
                            class="chakra-checkbox__input"
                            type="checkbox"
                            value=""
                            style="border: 0px; clip: rect(0px, 0px, 0px, 0px); height: 1px; width: 1px; margin: -1px; padding: 0px; overflow: hidden; white-space: nowrap; position: absolute;"
                          ><span
                            class="chakra-checkbox__control emotion-css-cache-4e77to"
                            aria-hidden="true"
                          /></label>
                        </div>
                        <div class="text-sm">
                          <div class="">
                            <div class="py-3 pl-2 pr-5 cursor-pointer">
                              <div
                                style="font-size: 13px;"
                                class="font-normal py-1 text-teal-950 mb-2 group-hover:text-forest-700"
                              >
                                {{ article.title }}
                              </div>
                              <div class="flex items-start mb-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  viewBox="0 0 256 256"
                                  class="mr-3 mt-0.5 text-stone-400"
                                >
                                  <rect
                                    width="256"
                                    height="256"
                                    fill="none"
                                  />
                                  <circle
                                    cx="88"
                                    cy="108"
                                    r="52"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-miterlimit="10"
                                    stroke-width="16"
                                  />
                                  <path
                                    d="M155.4,57.9A54.5,54.5,0,0,1,169.5,56a52,52,0,0,1,0,104"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="16"
                                  />
                                  <path
                                    d="M16,197.4a88,88,0,0,1,144,0"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="16"
                                  />
                                  <path
                                    d="M169.5,160a87.9,87.9,0,0,1,72,37.4"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="16"
                                  />
                                </svg><span
                                  class="flex-1 text-xs text-gray-500 truncate mr-6 whitespace-pre-wrap"
                                >{{
                                  article.author }} <span
                                  class="bg-stone-50 p-1 rounded-full text-xs font-medium text-stone-500 ml-1"
                                >+1</span></span>
                              </div>
                              <div class="w-fit items-center mt-1 flex">
                                <div class="text-gray-500 font-medium text-xs">
                                  {{ getYear(article.datePublished) }}<span
                                    class="text-stone-400"
                                  > · </span>
                                </div>
                                <div
                                  class="text-stone-500 font-medium text-xs ml-1 mr-2"
                                >
                                  {{ article.source }}
                                </div>
                                <!-- <span class="rounded-full transition-all flex items-center ease-in-out my-1 mx-1 gap-0.5 pr-1.5 pl-2 py-0.5  cursor-pointer emotion-css-cache-t69a6e"><span class="emotion-css-cache-1ny2kle">PDF</span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="14"
                                  fill="currentColor"
                                  viewBox="0 0 256 256"
                                ><rect
                                  width="256"
                                  height="256"
                                  fill="none"
                                /><line
                                  x1="64"
                                  y1="192"
                                  x2="192"
                                  y2="64"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="16"
                                /><polyline
                                  points="88 64 192 64 192 168"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="16"
                                />
                            </svg></span> -->
                                <a
                                  :href="article.url"
                                  target="_blank"
                                  class="text-xs"
                                >
                                  <span
                                    class="hover:bg-teal-50 border border-teal-800 rounded-lg bg-stone-100 transition-all flex items-center ease-in-out my-1 mx-1 gap-0.5 pr-1.5 pl-2 py-0.5 text-stone-500 cursor-pointer emotion-css-cache-1r07lk3"
                                  >
                                    <!-- <span class="emotion-css-cache-1ny2kle text-xs">Link</span> -->
                                    Link
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1.5"
                                      stroke="currentColor"
                                      class="w-3 h-3"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                                      />
                                    </svg>

                                  </span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          class="hover:bg-stone-50 rounded-md border border-gray-200 p-2 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute right-2 top-2 bg-white shadow-md z-10"
                          aria-label="Discard paper"
                          @click="removeArticleFromList(index)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            viewBox="0 0 256 256"
                            class="group-hover:!text-rust-700 text-red-500"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <rect
                              width="256"
                              height="256"
                              fill="none"
                            />
                            <line
                              x1="216"
                              y1="56"
                              x2="40"
                              y2="56"
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="16"
                            />
                            <line
                              x1="104"
                              y1="104"
                              x2="104"
                              y2="168"
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="16"
                            />
                            <line
                              x1="152"
                              y1="104"
                              x2="152"
                              y2="168"
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="16"
                            />
                            <path
                              d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56"
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="16"
                            />
                            <path
                              d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56"
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td
                      role="cell"
                      class="align-top h-full relative bg-white group-hover:bg-stone-50 border-stone-200 border-b border-r"
                    >
                      <div class="flex flex-row h-full">
                        <div class="text-sm">
                          <div class="flex justify-between h-full w-full">
                            <div
                              id="popover-trigger-:r2d:"
                              class="flex-1"
                              aria-haspopup="dialog"
                              aria-expanded="false"
                              aria-controls="popover-content-:r2d:"
                            >
                              <div
                                class="whitespace-pre-line font-light text-teal-950 py-3 px-5 pr-2 grow hover:cursor-pointer"
                                tabindex="-1"
                                style="text-decoration: none;font-size: 13px;"
                              >
                                {{ article.description }}
                              </div>
                            </div>
                            <div
                              class="chakra-popover__popper emotion-css-cache-1qq679y"
                              style="visibility: hidden; position: fixed; min-width: max-content; inset: 0px auto auto 0px;"
                            >
                              <section
                                id="popover-content-:r2d:"
                                class="chakra-popover__content w-full sm:w-[580px] emotion-css-cache-sjj62m"
                                tabindex="-1"
                                role="dialog"
                                style="transform-origin: var(--popper-transform-origin); opacity: 0; visibility: hidden; transform: scale(0.95) translateZ(0px);"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      role="cell"
                      class="align-top h-full relative bg-white group-hover:bg-stone-50 border-stone-200 border-b border-r"
                    >
                      <div class="flex flex-row h-full">
                        <div class="text-sm">
                          <div class="flex justify-between h-full w-full">
                            <div
                              id="popover-trigger-:r2f:"
                              class="flex-1"
                              aria-haspopup="dialog"
                              aria-expanded="false"
                              aria-controls="popover-content-:r2f:"
                            >
                              <div
                                class="whitespace-pre-line font-light text-teal-950 py-3 px-5 pr-2 grow hover:cursor-pointer"
                                tabindex="-1"
                                style="text-decoration: none;font-size: 13px;"
                              >
                                {{ article.summary }}
                              </div>
                            </div>
                            
                            <div
                              class="chakra-popover__popper emotion-css-cache-1qq679y"
                              style="visibility: hidden; position: fixed; min-width: max-content; inset: 0px auto auto 0px;"
                            >
                              <section
                                id="popover-content-:r2f:"
                                class="chakra-popover__content w-full sm:w-[580px] emotion-css-cache-sjj62m"
                                tabindex="-1"
                                role="dialog"
                                style="transform-origin: var(--popper-transform-origin); opacity: 0; visibility: hidden; transform: scale(0.95) translateZ(0px);"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      v-show="article.narratives"
                      role="cell"
                      class="align-top h-full relative bg-white group-hover:bg-stone-50 border-stone-200 border-b"
                    >
                      <div class="flex flex-row h-full">
                        <div class="text-sm">
                          <div class="flex justify-between h-full w-full">
                            <div
                              id="popover-trigger-:r2h:"
                              class="flex-1"
                              aria-haspopup="dialog"
                              aria-expanded="false"
                              aria-controls="popover-content-:r2h:"
                            >
                              <div
                                style="font-size: 13px;"
                                class="whitespace-pre-line py-3 font-light text-teal-950 px-5 pr-2 grow hover:cursor-pointer"
                                tabindex="-1"
                                v-html="formatArticleNarrative(article.narratives)"
                              />
                            </div>
                            <div
                              class="chakra-popover__popper emotion-css-cache-1qq679y"
                              style="visibility: hidden; position: fixed; min-width: max-content; inset: 0px auto auto 0px;"
                            >
                              <section
                                id="popover-content-:r2h:"
                                class="chakra-popover__content w-full sm:w-[580px] emotion-css-cache-sjj62m"
                                tabindex="-1"
                                role="dialog"
                                style="transform-origin: var(--popper-transform-origin); opacity: 0; visibility: hidden; transform: scale(0.95) translateZ(0px);"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      v-show="article.dominance"
                      role="cell"
                      class="align-top h-full relative bg-white group-hover:bg-stone-50 border-stone-200 border-b border-r"
                    >
                      <div class="flex flex-row h-full">
                        <div class="text-sm">
                          <div class="flex justify-between h-full w-full">
                            <div
                              id="popover-trigger-:r2f:"
                              class="flex-1"
                              aria-haspopup="dialog"
                              aria-expanded="false"
                              aria-controls="popover-content-:r2f:"
                            >
                              <div
                                class="whitespace-pre-line font-light text-teal-950 py-3 px-5 pr-2 grow hover:cursor-pointer"
                                tabindex="-1"
                                style="text-decoration: none;font-size: 13px;"
                                v-html="formatArticleNarrative(article.dominance)"
                              />
                              <!-- {{ formatArticleNarrative(article.dominance) }} -->
                              <!-- </div> -->
                            </div>
                            
                            <div
                              class="chakra-popover__popper emotion-css-cache-1qq679y"
                              style="visibility: hidden; position: fixed; min-width: max-content; inset: 0px auto auto 0px;"
                            >
                              <section
                                id="popover-content-:r2f:"
                                class="chakra-popover__content w-full sm:w-[580px] emotion-css-cache-sjj62m"
                                tabindex="-1"
                                role="dialog"
                                style="transform-origin: var(--popper-transform-origin); opacity: 0; visibility: hidden; transform: scale(0.95) translateZ(0px);"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      v-show="article.evolution"
                      role="cell"
                      class="align-top h-full relative bg-white group-hover:bg-stone-50 border-stone-200 border-b border-r"
                    >
                      <div class="flex flex-row h-full">
                        <div class="text-sm">
                          <div class="flex justify-between h-full w-full">
                            <div
                              id="popover-trigger-:r2f:"
                              class="flex-1"
                              aria-haspopup="dialog"
                              aria-expanded="false"
                              aria-controls="popover-content-:r2f:"
                            >
                              <div
                                class="whitespace-pre-line font-light text-teal-950 py-3 px-5 pr-2 grow hover:cursor-pointer"
                                tabindex="-1"
                                style="text-decoration: none;font-size: 13px;"
                              >
                                {{ article.evolution }}
                              </div>
                            </div>
                            
                            <div
                              class="chakra-popover__popper emotion-css-cache-1qq679y"
                              style="visibility: hidden; position: fixed; min-width: max-content; inset: 0px auto auto 0px;"
                            >
                              <section
                                id="popover-content-:r2f:"
                                class="chakra-popover__content w-full sm:w-[580px] emotion-css-cache-sjj62m"
                                tabindex="-1"
                                role="dialog"
                                style="transform-origin: var(--popper-transform-origin); opacity: 0; visibility: hidden; transform: scale(0.95) translateZ(0px);"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- <div class="bottom-0 w-full border-t border-stone-100 bg-white shadow-[0px_-2px_8px_rgba(76,21,6,0.03)]">
              <div class="flex justify-center items-center py-1">
                <div class="scale-90">
                  <div class="flex-1" /><button
                    type="button"
                    class="chakra-button emotion-css-cache-vkekvm"
                    style="padding-left: 1rem; padding-right: 1rem;"
                  >
                    Load more
                  </button><div class="flex-1" />
                </div>
              </div>
            </div> -->
          </div>


          <!-- todo the side modal -->
          <!-- <div class="flex-shrink-0 bg-white border-l border-stone-200 w-[300px] flex flex-col sm:block hidden sm:block">
            <div class="sticky top-0 px-4 py-[10.1px] border-b border-stone-200 bg-stone-50">
              <h2 class="text-sm font-medium text-stone-700">
                Manage Columns
              </h2>
            </div><div class="overflow-y-auto h-[calc(100%-55px)]">
              <div class="px-0 py-2">
                <div class="mb-2 overflow-auto px-3 text-sm">
                  <div
                    tabindex="-1"
                    class="outline-none"
                  >
                    <div class="p-1">
                      <div class="flex justify-between items-center">
                        <p class="font-semibold mt-1">
                          Search or create a column
                        </p>
                      </div><div class="">
                        <p class="my-2 text-sm text-stone-500">
                          Describe what kind of data you want to extract
                        </p><input
                          class="chakra-input mt-1 mb-2 emotion-css-cache-1tjamt5"
                          placeholder="e.g. Limitations, Survival time"
                          value=""
                        ><div class="text-xs tracking-wide uppercase text-stone-400 font-semibold mt-4 mb-1">
                          Current columns
                        </div><div class="flex flex-col mb-4 gap-1 -mx-3">
                          <div class="flex justify-between items-center pl-3 rounded-4 hover:bg-stone-50 text-stone-700 hover:cursor-pointer transition-all duration-300 group -my-0.5">
                            <span>Outcome measured</span><div class="flex items-center">
                              <div>
                                <div class="cursor-pointer">
                                  <button
                                    type="button"
                                    class="chakra-button group hover:bg-forest-100 -mr-1.5 emotion-css-cache-1vvyfns"
                                    aria-label="Turn on high accuracy"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="20"
                                      fill="currentColor"
                                      viewBox="0 0 256 256"
                                      class="!text-stone-400 group-hover:!text-forest-500 transition-colors duration-300"
                                      aria-hidden="true"
                                      focusable="false"
                                    ><rect
                                      width="256"
                                      height="256"
                                      fill="none"
                                    /><line
                                      x1="128"
                                      y1="128"
                                      x2="224"
                                      y2="32"
                                      fill="none"
                                      stroke="currentColor"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="16"
                                    /><path
                                      d="M195.9,60.1a96.2,96.2,0,1,0,18.7,26.5"
                                      fill="none"
                                      stroke="currentColor"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="16"
                                    /><path
                                      d="M161.9,94.1a47.9,47.9,0,1,0,14,31.2"
                                      fill="none"
                                      stroke="currentColor"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="16"
                                    /></svg>
                                  </button>
                                </div>
                              </div><div>
                                <button
                                  id="popover-trigger-:r7n:"
                                  type="button"
                                  class="chakra-button hover:bg-forest-100 group mr-2 emotion-css-cache-1vvyfns"
                                  aria-label="Column actions"
                                  aria-haspopup="dialog"
                                  aria-expanded="false"
                                  aria-controls="popover-content-:r7n:"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    fill="currentColor"
                                    viewBox="0 0 256 256"
                                    class="!text-stone-400 group-hover:!text-forest-500 mr-1 mt-[0.5px]"
                                    aria-hidden="true"
                                    focusable="false"
                                  ><rect
                                    width="256"
                                    height="256"
                                    fill="none"
                                  /><polyline
                                    points="96 48 176 128 96 208"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="16"
                                  /></svg>
                                </button>
                              </div>
                            </div>
                          </div><div class="flex justify-between items-center pl-3 rounded-4 hover:bg-stone-50 text-stone-700 hover:cursor-pointer transition-all duration-300 group -my-0.5">
                            <span>Limitations</span><div class="flex items-center">
                              <div>
                                <div class="cursor-pointer">
                                  <button
                                    type="button"
                                    class="chakra-button group hover:bg-forest-100 -mr-1.5 emotion-css-cache-1vvyfns"
                                    aria-label="Turn on high accuracy"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="20"
                                      fill="currentColor"
                                      viewBox="0 0 256 256"
                                      class="!text-stone-400 group-hover:!text-forest-500 transition-colors duration-300"
                                      aria-hidden="true"
                                      focusable="false"
                                    ><rect
                                      width="256"
                                      height="256"
                                      fill="none"
                                    /><line
                                      x1="128"
                                      y1="128"
                                      x2="224"
                                      y2="32"
                                      fill="none"
                                      stroke="currentColor"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="16"
                                    /><path
                                      d="M195.9,60.1a96.2,96.2,0,1,0,18.7,26.5"
                                      fill="none"
                                      stroke="currentColor"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="16"
                                    /><path
                                      d="M161.9,94.1a47.9,47.9,0,1,0,14,31.2"
                                      fill="none"
                                      stroke="currentColor"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="16"
                                    /></svg>
                                  </button>
                                </div>
                              </div><div>
                                <button
                                  id="popover-trigger-:r7v:"
                                  type="button"
                                  class="chakra-button hover:bg-forest-100 group mr-2 emotion-css-cache-1vvyfns"
                                  aria-label="Column actions"
                                  aria-haspopup="dialog"
                                  aria-expanded="false"
                                  aria-controls="popover-content-:r7v:"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    fill="currentColor"
                                    viewBox="0 0 256 256"
                                    class="!text-stone-400 group-hover:!text-forest-500 mr-1 mt-[0.5px]"
                                    aria-hidden="true"
                                    focusable="false"
                                  ><rect
                                    width="256"
                                    height="256"
                                    fill="none"
                                  /><polyline
                                    points="96 48 176 128 96 208"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="16"
                                  /></svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div><div class="flex flex-col -mx-3">
                          <div /><div>
                            <div class="text-xs tracking-wide uppercase text-stone-400 font-semibold mt-2 mb-1 flex items-center justify-between mx-3">
                              Add columns
                            </div><div class="flex">
                              <div
                                id="popover-trigger-:r81:"
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                aria-controls="popover-content-:r81:"
                              >
                                <button
                                  type="button"
                                  class="chakra-button hover:cursor-pointer !pl-2 -my-0.5 py-2.5 h-auto font-normal w-full emotion-css-cache-5yyv43"
                                  disabled=""
                                  style="padding-left: 0.5rem; padding-right: 1rem;"
                                >
                                  <span class="chakra-button__icon emotion-css-cache-1wh2kri"><svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    fill="currentColor"
                                    viewBox="0 0 256 256"
                                    class="mr-0.5"
                                    aria-hidden="true"
                                    focusable="false"
                                  ><rect
                                    width="256"
                                    height="256"
                                    fill="none"
                                  /><line
                                    x1="40"
                                    y1="128"
                                    x2="216"
                                    y2="128"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="16"
                                  /><line
                                    x1="128"
                                    y1="40"
                                    x2="128"
                                    y2="216"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="16"
                                  /></svg></span>Summary
                                </button>
                              </div><div
                                class="chakra-popover__popper emotion-css-cache-1qq679y"
                                style="visibility: hidden; position: absolute; min-width: max-content; inset: 0px auto auto 0px;"
                              >
                                <section
                                  id="popover-content-:r81:"
                                  class="chakra-popover__content w-[300px] emotion-css-cache-sjj62m"
                                  tabindex="-1"
                                  role="tooltip"
                                  style="transform-origin: var(--popper-transform-origin); opacity: 0; visibility: hidden; transform: scale(0.95) translateZ(0px);"
                                  aria-describedby="popover-body-:r81:"
                                >
                                  <div
                                    id="popover-body-:r81:"
                                    class="chakra-popover__body emotion-css-cache-1ews2c8"
                                  >
                                    <div class="p-4 flex flex-col gap-2">
                                      <div class="flex flex-row justify-between items-center">
                                        <p class="text-sm font-semibold text-forest-500 capitalize">
                                          column limit reached
                                        </p><div>
                                          <div class="cursor-pointer">
                                            <div class="bg-forest-200 rounded-4 uppercase text-xs font-bold text-forest-800 px-1.5 py-1 ml-2 -mr-0.5 inline-block pointer-events-none">
                                              Upgrade
                                            </div>
                                          </div>
                                        </div>
                                      </div><p class="text-sm text-stone-400">
                                        Remove some of your columns or upgrade to see more columns at once.
                                      </p><div class="flex justify-end mt-auto">
                                        <div>
                                          <div class="cursor-pointer">
                                            <button
                                              type="button"
                                              class="chakra-button text-sm mt-0 text-forest-600 font-medium !pr-0 !mr-0 emotion-css-cache-1o03qhx"
                                              style="padding-left: 0.75rem; padding-right: 0.75rem;"
                                            >
                                              Learn more
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              </div>
                            </div><div class="flex">
                              <div
                                id="popover-trigger-:r87:"
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                aria-controls="popover-content-:r87:"
                              >
                                <button
                                  type="button"
                                  class="chakra-button hover:cursor-pointer !pl-2 -my-0.5 py-2.5 h-auto font-normal w-full emotion-css-cache-5yyv43"
                                  disabled=""
                                  style="padding-left: 0.5rem; padding-right: 1rem;"
                                >
                                  <span class="chakra-button__icon emotion-css-cache-1wh2kri"><svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    fill="currentColor"
                                    viewBox="0 0 256 256"
                                    class="mr-0.5"
                                    aria-hidden="true"
                                    focusable="false"
                                  ><rect
                                    width="256"
                                    height="256"
                                    fill="none"
                                  /><line
                                    x1="40"
                                    y1="128"
                                    x2="216"
                                    y2="128"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="16"
                                  /><line
                                    x1="128"
                                    y1="40"
                                    x2="128"
                                    y2="216"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="16"
                                  /></svg></span>Main findings
                                </button>
                              </div><div
                                class="chakra-popover__popper emotion-css-cache-1qq679y"
                                style="visibility: hidden; position: absolute; min-width: max-content; inset: 0px auto auto 0px;"
                              >
                                <section
                                  id="popover-content-:r87:"
                                  class="chakra-popover__content w-[300px] emotion-css-cache-sjj62m"
                                  tabindex="-1"
                                  role="tooltip"
                                  style="transform-origin: var(--popper-transform-origin); opacity: 0; visibility: hidden; transform: scale(0.95) translateZ(0px);"
                                  aria-describedby="popover-body-:r87:"
                                >
                                  <div
                                    id="popover-body-:r87:"
                                    class="chakra-popover__body emotion-css-cache-1ews2c8"
                                  >
                                    <div class="p-4 flex flex-col gap-2">
                                      <div class="flex flex-row justify-between items-center">
                                        <p class="text-sm font-semibold text-forest-500 capitalize">
                                          column limit reached
                                        </p><div>
                                          <div class="cursor-pointer">
                                            <div class="bg-forest-200 rounded-4 uppercase text-xs font-bold text-forest-800 px-1.5 py-1 ml-2 -mr-0.5 inline-block pointer-events-none">
                                              Upgrade
                                            </div>
                                          </div>
                                        </div>
                                      </div><p class="text-sm text-stone-400">
                                        Remove some of your columns or upgrade to see more columns at once.
                                      </p><div class="flex justify-end mt-auto">
                                        <div>
                                          <div class="cursor-pointer">
                                            <button
                                              type="button"
                                              class="chakra-button text-sm mt-0 text-forest-600 font-medium !pr-0 !mr-0 emotion-css-cache-1o03qhx"
                                              style="padding-left: 0.75rem; padding-right: 0.75rem;"
                                            >
                                              Learn more
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              </div>
                            </div><div class="flex">
                              <div
                                id="popover-trigger-:r8d:"
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                aria-controls="popover-content-:r8d:"
                              >
                                <button
                                  type="button"
                                  class="chakra-button hover:cursor-pointer !pl-2 -my-0.5 py-2.5 h-auto font-normal w-full emotion-css-cache-5yyv43"
                                  disabled=""
                                  style="padding-left: 0.5rem; padding-right: 1rem;"
                                >
                                  <span class="chakra-button__icon emotion-css-cache-1wh2kri"><svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    fill="currentColor"
                                    viewBox="0 0 256 256"
                                    class="mr-0.5"
                                    aria-hidden="true"
                                    focusable="false"
                                  ><rect
                                    width="256"
                                    height="256"
                                    fill="none"
                                  /><line
                                    x1="40"
                                    y1="128"
                                    x2="216"
                                    y2="128"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="16"
                                  /><line
                                    x1="128"
                                    y1="40"
                                    x2="128"
                                    y2="216"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="16"
                                  /></svg></span>Methodology
                                </button>
                              </div><div
                                class="chakra-popover__popper emotion-css-cache-1qq679y"
                                style="visibility: hidden; position: absolute; min-width: max-content; inset: 0px auto auto 0px;"
                              >
                                <section
                                  id="popover-content-:r8d:"
                                  class="chakra-popover__content w-[300px] emotion-css-cache-sjj62m"
                                  tabindex="-1"
                                  role="tooltip"
                                  style="transform-origin: var(--popper-transform-origin); opacity: 0; visibility: hidden; transform: scale(0.95) translateZ(0px);"
                                  aria-describedby="popover-body-:r8d:"
                                >
                                  <div
                                    id="popover-body-:r8d:"
                                    class="chakra-popover__body emotion-css-cache-1ews2c8"
                                  >
                                    <div class="p-4 flex flex-col gap-2">
                                      <div class="flex flex-row justify-between items-center">
                                        <p class="text-sm font-semibold text-forest-500 capitalize">
                                          column limit reached
                                        </p><div>
                                          <div class="cursor-pointer">
                                            <div class="bg-forest-200 rounded-4 uppercase text-xs font-bold text-forest-800 px-1.5 py-1 ml-2 -mr-0.5 inline-block pointer-events-none">
                                              Upgrade
                                            </div>
                                          </div>
                                        </div>
                                      </div><p class="text-sm text-stone-400">
                                        Remove some of your columns or upgrade to see more columns at once.
                                      </p><div class="flex justify-end mt-auto">
                                        <div>
                                          <div class="cursor-pointer">
                                            <button
                                              type="button"
                                              class="chakra-button text-sm mt-0 text-forest-600 font-medium !pr-0 !mr-0 emotion-css-cache-1o03qhx"
                                              style="padding-left: 0.75rem; padding-right: 0.75rem;"
                                            >
                                              Learn more
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              </div>
                            </div><div class="flex">
                              <div
                                id="popover-trigger-:r8j:"
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                aria-controls="popover-content-:r8j:"
                              >
                                <button
                                  type="button"
                                  class="chakra-button hover:cursor-pointer !pl-2 -my-0.5 py-2.5 h-auto font-normal w-full emotion-css-cache-5yyv43"
                                  disabled=""
                                  style="padding-left: 0.5rem; padding-right: 1rem;"
                                >
                                  <span class="chakra-button__icon emotion-css-cache-1wh2kri"><svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    fill="currentColor"
                                    viewBox="0 0 256 256"
                                    class="mr-0.5"
                                    aria-hidden="true"
                                    focusable="false"
                                  ><rect
                                    width="256"
                                    height="256"
                                    fill="none"
                                  /><line
                                    x1="40"
                                    y1="128"
                                    x2="216"
                                    y2="128"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="16"
                                  /><line
                                    x1="128"
                                    y1="40"
                                    x2="128"
                                    y2="216"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="16"
                                  /></svg></span>Intervention
                                </button>
                              </div><div
                                class="chakra-popover__popper emotion-css-cache-1qq679y"
                                style="visibility: hidden; position: absolute; min-width: max-content; inset: 0px auto auto 0px;"
                              >
                                <section
                                  id="popover-content-:r8j:"
                                  class="chakra-popover__content w-[300px] emotion-css-cache-sjj62m"
                                  tabindex="-1"
                                  role="tooltip"
                                  style="transform-origin: var(--popper-transform-origin); opacity: 0; visibility: hidden; transform: scale(0.95) translateZ(0px);"
                                  aria-describedby="popover-body-:r8j:"
                                >
                                  <div
                                    id="popover-body-:r8j:"
                                    class="chakra-popover__body emotion-css-cache-1ews2c8"
                                  >
                                    <div class="p-4 flex flex-col gap-2">
                                      <div class="flex flex-row justify-between items-center">
                                        <p class="text-sm font-semibold text-forest-500 capitalize">
                                          column limit reached
                                        </p><div>
                                          <div class="cursor-pointer">
                                            <div class="bg-forest-200 rounded-4 uppercase text-xs font-bold text-forest-800 px-1.5 py-1 ml-2 -mr-0.5 inline-block pointer-events-none">
                                              Upgrade
                                            </div>
                                          </div>
                                        </div>
                                      </div><p class="text-sm text-stone-400">
                                        Remove some of your columns or upgrade to see more columns at once.
                                      </p><div class="flex justify-end mt-auto">
                                        <div>
                                          <div class="cursor-pointer">
                                            <button
                                              type="button"
                                              class="chakra-button text-sm mt-0 text-forest-600 font-medium !pr-0 !mr-0 emotion-css-cache-1o03qhx"
                                              style="padding-left: 0.75rem; padding-right: 0.75rem;"
                                            >
                                              Learn more
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              </div>
                            </div><div class="flex">
                              <div
                                id="popover-trigger-:r8p:"
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                aria-controls="popover-content-:r8p:"
                              >
                                <button
                                  type="button"
                                  class="chakra-button hover:cursor-pointer !pl-2 -my-0.5 py-2.5 h-auto font-normal w-full emotion-css-cache-5yyv43"
                                  disabled=""
                                  style="padding-left: 0.5rem; padding-right: 1rem;"
                                >
                                  <span class="chakra-button__icon emotion-css-cache-1wh2kri"><svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    fill="currentColor"
                                    viewBox="0 0 256 256"
                                    class="mr-0.5"
                                    aria-hidden="true"
                                    focusable="false"
                                  ><rect
                                    width="256"
                                    height="256"
                                    fill="none"
                                  /><line
                                    x1="40"
                                    y1="128"
                                    x2="216"
                                    y2="128"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="16"
                                  /><line
                                    x1="128"
                                    y1="40"
                                    x2="128"
                                    y2="216"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="16"
                                  /></svg></span>Intervention effects
                                </button>
                              </div><div
                                class="chakra-popover__popper emotion-css-cache-1qq679y"
                                style="visibility: hidden; position: absolute; min-width: max-content; inset: 0px auto auto 0px;"
                              >
                                <section
                                  id="popover-content-:r8p:"
                                  class="chakra-popover__content w-[300px] emotion-css-cache-sjj62m"
                                  tabindex="-1"
                                  role="tooltip"
                                  style="transform-origin: var(--popper-transform-origin); opacity: 0; visibility: hidden; transform: scale(0.95) translateZ(0px);"
                                  aria-describedby="popover-body-:r8p:"
                                >
                                  <div
                                    id="popover-body-:r8p:"
                                    class="chakra-popover__body emotion-css-cache-1ews2c8"
                                  >
                                    <div class="p-4 flex flex-col gap-2">
                                      <div class="flex flex-row justify-between items-center">
                                        <p class="text-sm font-semibold text-forest-500 capitalize">
                                          column limit reached
                                        </p><div>
                                          <div class="cursor-pointer">
                                            <div class="bg-forest-200 rounded-4 uppercase text-xs font-bold text-forest-800 px-1.5 py-1 ml-2 -mr-0.5 inline-block pointer-events-none">
                                              Upgrade
                                            </div>
                                          </div>
                                        </div>
                                      </div><p class="text-sm text-stone-400">
                                        Remove some of your columns or upgrade to see more columns at once.
                                      </p><div class="flex justify-end mt-auto">
                                        <div>
                                          <div class="cursor-pointer">
                                            <button
                                              type="button"
                                              class="chakra-button text-sm mt-0 text-forest-600 font-medium !pr-0 !mr-0 emotion-css-cache-1o03qhx"
                                              style="padding-left: 0.75rem; padding-right: 0.75rem;"
                                            >
                                              Learn more
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              </div>
                            </div><div class="flex">
                              <div
                                id="popover-trigger-:r8v:"
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                aria-controls="popover-content-:r8v:"
                              >
                                <button
                                  type="button"
                                  class="chakra-button hover:cursor-pointer !pl-2 -my-0.5 py-2.5 h-auto font-normal w-full emotion-css-cache-5yyv43"
                                  disabled=""
                                  style="padding-left: 0.5rem; padding-right: 1rem;"
                                >
                                  <span class="chakra-button__icon emotion-css-cache-1wh2kri"><svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    fill="currentColor"
                                    viewBox="0 0 256 256"
                                    class="mr-0.5"
                                    aria-hidden="true"
                                    focusable="false"
                                  ><rect
                                    width="256"
                                    height="256"
                                    fill="none"
                                  /><line
                                    x1="40"
                                    y1="128"
                                    x2="216"
                                    y2="128"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="16"
                                  /><line
                                    x1="128"
                                    y1="40"
                                    x2="128"
                                    y2="216"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="16"
                                  /></svg></span>Summary of introduction
                                </button>
                              </div><div
                                class="chakra-popover__popper emotion-css-cache-1qq679y"
                                style="visibility: hidden; position: absolute; min-width: max-content; inset: 0px auto auto 0px;"
                              >
                                <section
                                  id="popover-content-:r8v:"
                                  class="chakra-popover__content w-[300px] emotion-css-cache-sjj62m"
                                  tabindex="-1"
                                  role="tooltip"
                                  style="transform-origin: var(--popper-transform-origin); opacity: 0; visibility: hidden; transform: scale(0.95) translateZ(0px);"
                                  aria-describedby="popover-body-:r8v:"
                                >
                                  <div
                                    id="popover-body-:r8v:"
                                    class="chakra-popover__body emotion-css-cache-1ews2c8"
                                  >
                                    <div class="p-4 flex flex-col gap-2">
                                      <div class="flex flex-row justify-between items-center">
                                        <p class="text-sm font-semibold text-forest-500 capitalize">
                                          column limit reached
                                        </p><div>
                                          <div class="cursor-pointer">
                                            <div class="bg-forest-200 rounded-4 uppercase text-xs font-bold text-forest-800 px-1.5 py-1 ml-2 -mr-0.5 inline-block pointer-events-none">
                                              Upgrade
                                            </div>
                                          </div>
                                        </div>
                                      </div><p class="text-sm text-stone-400">
                                        Remove some of your columns or upgrade to see more columns at once.
                                      </p><div class="flex justify-end mt-auto">
                                        <div>
                                          <div class="cursor-pointer">
                                            <button
                                              type="button"
                                              class="chakra-button text-sm mt-0 text-forest-600 font-medium !pr-0 !mr-0 emotion-css-cache-1o03qhx"
                                              style="padding-left: 0.75rem; padding-right: 0.75rem;"
                                            >
                                              Learn more
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div><div class="mt-4 flex justify-center">
                            <button
                              type="button"
                              class="chakra-button w-fit emotion-css-cache-1hoy65q"
                              style="padding-left: 0.5rem; padding-right: 0.5rem;"
                            >
                              Show more
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <!-- <button class="fixed bottom-1 left-0 right-0 w-full py-3 bg-blue-500 text-white text-center font-semibold">
      Click Me
    </button> -->
    <!-- z-30 blur-lg -->

    <!-- <div class="sticky bottom-1 h-[88px] rounded-lg pointer-events-none hidden sm:block justify-center w-[260px] left-[calc(50%-130px)]"> -->
    <button
      v-show="showTable && narrativeGenerated === false"
      type="button"
      class="sticky bottom-5 text-gray-200 mt-5 rounded-lg bg-teal-800 hover:bg-teal-700 z-30 h-[54px] items-center hidden sm:flex justify-center left-[calc(50%-150px)] shadow-[0px_1px_2px_rgba(137,93,72,0.3),0px_6px_12px_rgba(137,93,72,0.3),0px_8px_20px_rgba(137,93,72,0.3)] group"
      style="padding-left: 1.25rem; padding-right: 1.25rem;"
      @click="generateNarrativeAnalysis"
    >
      <div class="flex items-center gap-2 p-2 rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>

        <p class="font-medium">
          Generate Narrative Analysis
        </p>
      </div>
    </button>

    <button
      v-show="showTable && narrativeGenerated === false && narrativeGenerating === true"
      type="button"
      class="sticky bottom-5 text-gray-200 mt-5 rounded-lg bg-teal-800 hover:bg-teal-700 z-30 h-[54px] items-center hidden sm:flex justify-center left-[calc(50%-150px)] shadow-[0px_1px_2px_rgba(137,93,72,0.3),0px_6px_12px_rgba(137,93,72,0.3),0px_8px_20px_rgba(137,93,72,0.3)] group"
      style="padding-left: 1.25rem; padding-right: 1.25rem;"
      @click="generateNarrativeAnalysis"
    >
      <div class="inline-flex flex items-center gap-2 p-2 rounded">
        <div
          class="animate-spin inline-block w-7 h-7 border-[3px] border-current border-t-transparent text-gray-200 rounded-full"
          role="status"
          aria-label="loading"
        >
          <span class="sr-only">Loading...</span>
        </div>

        <p class="font-medium">
          Generating Narrative Analysis ...
        </p>
      </div>
    </button>

    <div
      v-show="openViewAnalysisModal"
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <!-- Background backdrop -->
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ease-out duration-300"
        aria-hidden="true"
        @click="openViewAnalysisModal = false"
      />

      <!-- Modal panel -->
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          @click="openViewAnalysisModal = false"
        >
          <transition
            enter-active-class="ease-out duration-300"
            enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to-class="opacity-100 translate-y-0 sm:scale-100"
            leave-active-class="ease-in duration-200"
            leave-from-class="opacity-100 translate-y-0 sm:scale-100"
            leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              v-if="openViewAnalysisModal"
              class="relative transform overflow-auto rounded-lg text-left shadow-xl transition-all sm:my-8 lg:max-w-[920px] sm:w-full sm:max-w-lg"
              style="background: #f8f8f7"
              @click.stop
            >
              <div
                class="max-h-screen px-4 pb-4 pt-5 sm:p-6 sm:pb-4"
                style="background: #f8f8f7"
              >
                <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <div class="flex items-center justify-between mb-10">
                      <h2 class="text-base font-semibold leading-7 text-teal-900">
                        {{ researchQuestion }}?
                      </h2>
                      <div
                        class="z-50 cursor-pointer modal-close"
                        @click="openViewAnalysisModal = false"
                      >
                        <svg
                          class="text-black fill-current hover:text-red-500"
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 18 18"
                        >
                          <path
                            d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                          />
                        </svg>
                      </div>
                    </div>
                    <!-- <div class="mb-9 font-semibold">
                      <h4 class="text-lg tracking-tight text-teal-800">
                        {{ research }}?
                      </h4>
                    </div> -->
                   
                    <!-- <Pie :data="chartData"  :options="chartOptions" /> -->
                    <div class="inline-flex w-full">
                      <div class="w-1/3 m-10">
                        <ul
                          role="list"
                          class="text-sm"
                        >
                          <li
                            v-for="(item, index) in statistics"
                            :key="index"
                            class="flex items-center"
                            :class="{ 'line-through': item.clicked }"
                            @click="handleItemClick(index)"
                          >
                            <span
                              :style="{ backgroundColor: item.color }"
                              class="block h-4 w-4 rounded"
                            />
                            <label
                              style="font-size: 12px;"
                              for="filter-mobile-color-0"
                              class="ml-3 min-w-0 flex-1 text-gray-500 tracking-tight hover:text-gray-800"
                            >{{ capitalizeFirstLetter(item.narrative) }}</label>
                          </li>
                        </ul>
                      </div>
                      <div class="w-2/3 h-auto">
                        <div class="max-w-sm h-30 content-center p-4">
                          <!-- Added padding for better presentation -->
                          <div class="relative w-full h-full place-self-center">
                            <!-- Added relative positioning -->
                            <Doughnut
                              ref="chart"
                              :data="formattedChartData"
                              :options="formattedChartOptions"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    
                    <div class="flex mt-6">
                      <div class="flex-initial w-full mb-9">
                        <p
                          style="font-size:15px;"
                          class="whitespace-pre-line tracking-tight text-gray-700 pr-2 grow hover:cursor-pointer"
                        >
                          {{ narrativeConclusion }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-teal-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-900 sm:ml-3 sm:w-auto"
                >
                  Submit
                </button>
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  @click="openViewAnalysisModal = false"
                >
                  Cancel
                </button>
              </div> -->
            </div>
          </transition>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Pie, Doughnut } from 'vue-chartjs'
import { defineComponent } from 'vue'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { ProjectService } from '../services/project.service'
import { Project } from '../utils/project.type'
import { ArticleService } from '../services/articles.service'
const projectService = new ProjectService()
const articleService = new ArticleService()
type ChartRef = ChartJS;
ChartJS.register(ArcElement, Tooltip, Legend)
ChartJS.register(ChartDataLabels)

export default defineComponent({
    name: 'ResearchView',
    components: { Pie, Doughnut },
    data() {
        return {
            chartData: {
                animation:{
                    animateScale:true,
                },
                // labels: this.statistics.map(item => item.Narrative),
                // datasets: [
                //     {
                //         backgroundColor: this.statsColor,
                //         data: [40, 20, 80, 10, 50],
                //         hoverOffset: 4,
                //         borderRadius:8,
                //         spacing:6,
                //     },
                // ],
            },
            chartOptions: {
                responsive: true,
                plugins: {
            legend: {
              display: false,
            },
          },
               
                // animation:{
                //     animateScale:true,
                // },
                // maintainAspectRatio: false,
            },
            plugins: [ChartDataLabels],
            notFound: false as boolean,
            showViewNarrativeAnalysisButton: false as boolean,
            openViewAnalysisModal: false as boolean,
            narrativeGenerating: false as boolean,
            narrativeGenerated: false as boolean,
            narrativeConclusion: '' as string,
            research: '' as string,
            statsColor: ['#05445E', '#189AB4', '#75E6DA', '#D4F1F4', '#7EC8E3'],
            statistics: {} as any,
            loading: false as boolean,
            showTable: false as boolean,
            articles: [] as any,
            researchQuestion: this.$route.query.q || '' as any,
            project: {} as Project,
        }
    },
    computed: {
        formattedChartData() {
            const filteredStatistics = this.statistics.filter((item: { clicked: any }) => !item.clicked)
        
        return {
            ...this.chartData,
            labels: filteredStatistics.map((item: { narrative: any }) => this.capitalizeFirstLetter(item.narrative)),
            datasets: [
                {
                    backgroundColor: this.statsColor,
                    data: filteredStatistics.map((item: { value: any }) => item.value),
                    hoverOffset: 4,
                    borderRadius: 8,
                spacing: 6,
                datalabels: {
                  color: 'white',
                  font: (context: { dataIndex: number }) => context.dataIndex === 1 ? ({ weight: 'bold' }) : undefined,
                  formatter: function (
                    value: any,
                    context: {
                      chart: {
                        data: {
                          labels: Array<{ value: string | number | any }>;
                        };
                      };
                      dataIndex: number;
                    },
                  ): string | number | any {
                    const { chart: { data: { labels } }, dataIndex } = context
                    return labels[dataIndex].value
                  },

                },
                },
            ],
        }
        },
        formattedChartOptions() {
            return {
                ...this.chartOptions,
                animation: {
                    animateScale: true,
                },
            }
        },
    },
    watch: {
        '$route.query.q': 'fetchArticles',
        articles(newArticles) {
            if (newArticles.length > 0) {
                this.showTable = true
            } else {
                this.showTable = false
            }
        },
    },
    mounted() {
        this.fetchProjectDetails(this.$route.params.id as string)
        if (this.$route.query.q) {
            this.fetchArticles()
        }
    },
    methods: {
      capitalizeFirstLetter(str: string) {
  if (!str) return str // Handle empty string or null input
  return str.charAt(0).toUpperCase() + str.slice(1)
},
        handleItemClick(index: number) {
        // Toggle the clicked state
        this.statistics[index].clicked = !this.statistics[index].clicked
        
        // Update the chart data
        this.updateChartData()
    },
    updateChartData() {
            // Type assertion to inform TypeScript of the specific type of the ref
            const chart = this.$refs.chart as ChartRef
            if (chart) {
                chart.update() // Call the update method
            }
        },
        removeArticleFromList(index: any) {
          this.articles.splice(index, 1) // Remove the article at the given index
          this.narrativeGenerated = false
          console.log('Article removed')
        },
        formatArticleNarrative(narratives: any) {
            if (!narratives) return ''
            let text = ''
            narratives.forEach((item: any) => {
                let subTexts = []
                for (let key in item) {
                    subTexts.push(item[key])
                }
                text += `- <b>${subTexts[0]}</b>: ${subTexts[1]}\n<br/>`
            })

            return this.formattedContent(text)
        },
        async generateNarrativeAnalysis() {
            try {
                this.narrativeGenerating = true
                const narrativeAnalysis: any = await articleService.generateNarrativeAnalysis({
                    researchQuestion: this.researchQuestion,
                    articles: this.articles,
                    projectId: this.project._id,
                })

                const result = narrativeAnalysis.data
                this.narrativeGenerated = true
                this.showViewNarrativeAnalysisButton = true
                this.articles = result.articles
                this.narrativeConclusion = result.conclusion
                this.statistics = this.addColorsToNarratives(result.statistics, this.statsColor)
                this.research = result.researchQuestion
            } catch (err) {
                this.narrativeGenerating = false
            }
        },
        addColorsToNarratives(statistics: any[], colors: string | any[]) {
            return statistics.map((stat: any, index: number) => ({
                ...stat,
                color: colors[index % colors.length], // Assign color, cycling through the colors array
            }))
        },
        getYear(dateString: any) {
            const date = new Date(dateString)
            return date.getUTCFullYear()
        },
        formattedContent(content: string) {
            // Replace newline characters with <br> tags
            return content.replace(/\n/g, '<br>')
        },
        async fetchProjectDetails(id: string) {
            const project: any = await projectService.get(id)
            console.log(project.data)
            this.project = project.data
        },
        async fetchArticles() {
          this.notFound = false
            this.narrativeGenerated = false
            this.showViewNarrativeAnalysisButton = false
            this.narrativeGenerating = false
            this.$router.push({ query: { q: this.researchQuestion } })
            this.articles = []
            this.loading = true
            const articles: any = await articleService.fetchList(this.researchQuestion)
            this.loading = false
            if(articles.data.length < 1) this.notFound = true
            this.articles = articles.data
        },
    },

})
</script>

<style>
.line-through {
    text-decoration: line-through;
}

</style>