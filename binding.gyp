{
  "targets": [
    {
      "target_name": "bitprim",
      "sources": [ "bitprim_addon.cc" ],

      # "include_dirs": ["/home/fernando/dev/bitprim/bitprim-node-cint/include"],
      # "libraries": [ "-lbitprim-node-cint", "-L/home/fernando/dev/bitprim/bitprim-node-cint/cmake-build-debug" ]
      "include_dirs": ["C:\\development\\bitprim\\bitprim-node-cint\\include", "C:\\development\\bitprim\\bitprim-core\\include"],
      # "libraries": [ "-LC:\\development\\bitprim\\bitprim-node-cint\\build", "-lbitprim-node-cint"  ]

      "libraries": [ "C:\\development\\bitprim\\bitprim-node-cint\\build\\bitprim-node-cint.lib"]

    }
  ]
}
