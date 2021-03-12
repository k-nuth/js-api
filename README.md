<img width="200px" src="https://github.com/k-nuth/js-api/raw/master/docs/images/kth-purple.png" />

# Javascript API

> Bitcoin Cash full node as a Javascript library

[![Latest Release](https://img.shields.io/nuget/v/kth-bch?logo=nuget&label=release&style=for-the-badge)](https://www.nuget.org/packages/kth-bch)
<a target="_blank" href="https://ci.appveyor.com/projects/k-nuth/js-api">![Build Status][badge.Appveyor]</a> 
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAHYcAAB2HAY%2Fl8WUAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTCtCgrAAAADB0lEQVR4XtWagXETMRREUwIlUAIlUAodQAl0AJ1AB9BB6AA6gA6MduKbkX%2BevKecNk525jHO3l%2Fp686xlJC70%2Bl0C942vjV%2Bn9FreVQbBc0wWujfRpW8Z78JaIb53hhJ1ygTA80w9PQ36duBMjHQHPCuoQZfutSjeqU1PAJN4E3j2pN7aVKv6pnWcgGawNfGa5N6prVcgGZBn8yvVXZXQbOgPXokXaPMNZwoc41D%2FaHZ8b7hpBrKjnCizIjD%2FaHZ8aPR6%2BeZXqqh7Agnyow43B%2BaZz40qnQ36a6rlsYgnChDLOkPzTN1z%2B9PafU0N3OAcaIMsaQ%2FNBufG1X9JyrtDMr0Y4xwokxlWX%2BPjAYdemhPrWeDvYcPJ8r0LO3v4oszNfivQQuTp2u9qJGKE2V6lvZ38UVj9q3t3oqEE2U2lvfXF4t6qPjTqDUV1fRyhw8nymws768vfOr2NtqOqFY4UUZE%2BusL6VDRX7%2FGzOHDiTIi0t9WMPsUKzNPx4kysf62gmuHir3sPXw4USbWny485ZOc2PsJ7VTro%2F3pwp5DxV7qHq2xa41TrY%2F2J7PfJkaHir3UwwdtU061PtqfTP0CUaYm2v3LxCtoDI2lMWk8p1of7Y8K0jhRJgaaYZwoE0P%2FpFUndZqtP6T4BE2zC5qtP6T4BE2zC5qtPyRN8OvhZUQae3ZBtT7anyb49PA6Ivp5wKnWR%2FvbJkncZXr6wokysf62CXRCWjmJxhqd2JwoE%2BuvTqS37JGJlB39GLzhRJmN5f31gz8XTpSJgWYYJ8rEQDOME2VioBnGiTIx0AzjRJkYaIZxokwMNMM4USYGmmGcKBMDzTBOlImBZhgnysRAM4wTZWKgGcaJMjHQDONEmRhohnGiTAw0wzhRJgaaYZwoEwPNME6UiYFmGCfKxEAzjBNlYqAZxokyMdAMoL%2FO%2BNi4bzjpT1e%2BNFb8V7gFzUXMLHqk%2BM1A8wArFj1S5GagOUly0SMtuxloTnJrUU%2B7QXOSW4t62g2ak9xa1NNu0Jzk1qKednK6%2Bw9roIB8keT%2F3QAAAABJRU5ErkJggg%3D%3D)](LICENSE.md)
<a target="_blank" href="https://t.me/knuth_cash">![Telegram][badge.telegram]</a>
<a target="_blank" href="https://k-nuth.slack.com/">![Slack][badge.slack]</a>

<p align="center"><img width="800px" src="docs/images/demo.png" /></p>

Knuth Javascript API is a high performance implementation of the Bitcoin Cash protocol focused on users requiring extra performance and flexibility. It is a Bitcoin Cash node you can use as a library.

## Prerequisites

Knuth Javascript API is a wrapper over our [C++ libraries](https://github.com/k-nuth/node), therefore in order to use the Javascript library we will need the toolchain to build the C++ libraries. Don't panic, you won't have to manually build our C++ libraries, you just have to provide some prerequisites, our build system will take care of the rest.

* [.NET Standard 2.0 compatible implementation](https://docs.microsoft.com/en-us/dotnet/standard/net-standard). We suggest [.Net Core 3.1](https://docs.microsoft.com/en-us/dotnet/core/install/).
* [Python PIP package-management system](https://pip.pypa.io/en/stable/installing/).

To speed up the compilation, we provide some pre-built C++ libraries for some common computer platforms, but case there are no pre-built binaries for your platform, our build system will automatically try to build from source code. In such a scenario, the following requirements must be added to the previous ones:

* C++17 [conforming compiler](https://en.cppreference.com/w/cpp/compiler_support). Could be [GCC8](https://gcc.gnu.org/), [Clang8](https://clang.llvm.org/) or [Visual Studio 2019](https://visualstudio.microsoft.com/vs/)
* CMake building tool, version 3.8 or newer.


## Getting started

1. Create a new Javascript console project:
```
$ mkdir HelloKnuth
$ cd HelloKnuth
$ TODO
```

2. Add a reference to our Javascript API package:

```
$ TODO
```

3. Edit `program.js` and write some code:

```Javascript
//TODO


```

4. Enjoy Knuth node as a Javascript library:

```
$ dotnet run
```

## Issues

Each of our modules has its own Github repository, but in case you want to create an issue, please do so in our [main repository](https://github.com/k-nuth/kth/issues).


<!-- Links -->
[badge.Travis]: https://travis-ci.org/k-nuth/js-api.svg?branch=master
<!-- [badge.Appveyor]: https://ci.appveyor.com/api/projects/status/github/k-nuth/js-api?svg=true&branch=master -->
[badge.Appveyor]: https://img.shields.io/appveyor/ci/Knuth/js-api.svg?style=for-the-badge&label=build&logo=appveyor&logoColor=white
[badge.Cirrus]: https://api.cirrus-ci.com/github/k-nuth/js-api.svg?branch=master
[badge.version]: https://badge.fury.io/gh/k-nuth%2Fkth-js-api.svg
[badge.release]: https://img.shields.io/github/release/k-nuth/js-api.svg
[badge.c]: https://img.shields.io/badge/C-11-blue.svg?style=flat&logo=c
[badge.telegram]: https://img.shields.io/badge/telegram-badge-blue.svg?logo=telegram&style=for-the-badge
[badge.slack]: https://img.shields.io/badge/slack-badge-orange.svg?logo=slack&style=for-the-badge



<!-- [![Downloads](https://img.shields.io/nuget/dt/kth-bch.svg?style=for-the-badge&logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAHYcAAB2HAY%2Fl8WUAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTnU1rJkAAABrUlEQVR4XuXQQW7DMAxE0Rw1R%2BtN3XAjBOpPaptfsgkN8DazIDB8bNu2NCxXguVKsFwJlrJs6KYGS1k2dFODpSwbuqnBUpYN3dRgKcuGbmqwlGVDNzVYyrKhmxosZdnQTQ2WsmzopgZLWTZ0U4OlLBu6qcFSlg3d1GApy4ZuarCUZUM3NVjKsqGbGixl2dBNDZaybOimBktZNnRTg6UsG7qpwVKWDd3UYPnB86VKfl5owx9YflHhCbvHByz%2FcecnHBofsNzhjk84PD5gudOdnnBqfMDygDs84fT4gOVBVz4hNT5gecIVT0iPD1ieNPMJyviAZcKMJ2jjA5ZJI5%2Bgjg9YCkY8QR8fsJSYTxgyPmApMp4wbHzAUpZ5wtDxAcsBzjxh%2BPiA5SBHnjBlfMByoD1PmDY%2BYDnYtydMHR%2BwnICeMH18wHKS9ydcMj5gOVE84bLxAcuVYLkSLDvVQ5saLDvVQ5saLDvVQ5saLDvVQ5saLDvVQ5saLDvVQ5saLDvVQ5saLDvVQ5saLDvVQ5saLDvVQ5saLDvVQ5saLDvVQ5saLFeC5UqwXAmW69gev7WIMc4gs9idAAAAAElFTkSuQmCC)](https://www.nuget.org/packages/kth-bch/)
-->

<!-- [![Latest Pre-Release](https://img.shields.io/nuget/vpre/kth-bch?logo=nuget&color=yellow&label=pre-release&style=for-the-badge)](https://www.nuget.org/packages/kth-bch/absoluteLatest) -->
