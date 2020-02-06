{
  "targets": [
    {
      "target_name": "kth",
      "sources": [ "kth_addon.cc" ],

      # "include_dirs": ["/home/fernando/dev/k-nuth/c-api/include"],
      # "libraries": [ "-lkth-c-api", "-L/home/fernando/dev/k-nuth/c-api/cmake-build-debug" ]
      "include_dirs": ["C:\\development\\kth\\kth-c-api\\include", "C:\\development\\kth\\kth-core\\include"],
      # "libraries": [ "-LC:\\development\\kth\\kth-c-api\\build", "-lkth-c-api"  ]

      "libraries": [ "C:\\development\\kth\\kth-c-api\\build\\kth-c-api.lib"]

    }
  ]
}
