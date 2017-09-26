#include <node.h>

#include <bitprim/nodecint/executor_c.h>

#include <inttypes.h>   //TODO: Remove, it is for the printf (printing pointer addresses)

namespace bitprim_ns {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;
using v8::External;
using v8::Exception;
using v8::Number;
using v8::Persistent;
using v8::Function;

//void Method(FunctionCallbackInfo<Value> const& args) {
//    Isolate* isolate = args.GetIsolate();
//    args.GetReturnValue().Set(String::NewFromUtf8(isolate, "world"));
//}


void bitprim_executor_construct(FunctionCallbackInfo<Value> const& args) {
    Isolate* isolate = args.GetIsolate();

    if (args.Length() != 3) {
        isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Wrong number of arguments")));
        return;
    }

//    printf("args[0]->IsString(): %d\n", args[0]->IsString());
//    printf("args[1]->IsObject(): %d\n", args[1]->IsObject());
//    printf("args[2]->IsObject(): %d\n", args[2]->IsObject());

//    printf("args[1]->IsObject(): %d\n", args[1]->IsObject());
//    printf("args[2]->IsObject(): %d\n", args[2]->IsObject());
//    printf("args[1]->IsNull():   %d\n", args[1]->IsNull());
//    printf("args[2]->IsNull():   %d\n", args[2]->IsNull());

    if ( ! args[0]->IsString() ||
         ! (args[1]->IsObject() || args[1]->IsNull()) ||
         ! (args[2]->IsObject() || args[2]->IsNull())
       ) {
        isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Wrong arguments")));
        return;
    }

    v8::String::Utf8Value path(args[0]->ToString());


    int32_t sout_fd = -1;
    int32_t serr_fd = -1;

    if (! args[1]->IsNull()) {
        auto sout_obj = args[1]->ToObject();
        sout_fd = sout_obj->Get(String::NewFromUtf8(isolate, "fd"))->Int32Value();
    }

    if (! args[2]->IsNull()) {
        auto serr_obj = args[2]->ToObject();
        serr_fd = serr_obj->Get(String::NewFromUtf8(isolate, "fd"))->Int32Value();
    }

//    printf("path:    %s\n", *path);
//    printf("sout_fd: %d\n", sout_fd);
//    printf("serr_fd: %d\n", serr_fd);

    executor_t exec = executor_construct_fd(*path, sout_fd, serr_fd);
//    printf("bitprim_executor_construct - exec: 0x%" PRIXPTR "\n", (uintptr_t)exec);

    Local<External> ext = External::New(isolate, exec);
//    printf("xxxxx 4\n");
    args.GetReturnValue().Set(ext);
//    printf("xxxxx 5\n");
}


void bitprim_executor_destruct(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();

    // Check the number of arguments passed.
    if (args.Length() != 1) {
        isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Wrong number of arguments")));
        return;
    }

    if (!args[0]->IsExternal()) {
        isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Wrong arguments")));
        return;
    }

    void* vptr = v8::External::Cast(*args[0])->Value();
    executor_t exec = (executor_t)vptr;
    executor_destruct(exec);
}


void bitprim_executor_stop(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();

    // Check the number of arguments passed.
    if (args.Length() != 1) {
        isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Wrong number of arguments")));
        return;
    }

    if (!args[0]->IsExternal()) {
        isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Wrong arguments")));
        return;
    }

    void* vptr = v8::External::Cast(*args[0])->Value();
    executor_t exec = (executor_t)vptr;
    executor_stop(exec);
}


void bitprim_executor_initchain(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();

    // Check the number of arguments passed.
    if (args.Length() != 1) {
        isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Wrong number of arguments")));
        return;
    }

    if (!args[0]->IsExternal()) {
        isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Wrong arguments")));
        return;
    }

    void* vptr = v8::External::Cast(*args[0])->Value();
    executor_t exec = (executor_t)vptr;
    int res = executor_initchain(exec);

    Local<Number> num = Number::New(isolate, res);
    args.GetReturnValue().Set(num);
}

//void bitprim_executor_run(const FunctionCallbackInfo<Value>& args) {
//    Isolate* isolate = args.GetIsolate();
//
//    // Check the number of arguments passed.
//    if (args.Length() != 1) {
//        isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Wrong number of arguments")));
//        return;
//    }
//
//    if (!args[0]->IsExternal()) {
//        isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Wrong arguments")));
//        return;
//    }
//
//    void* vptr = v8::External::Cast(*args[0])->Value();
//    executor_t exec = (executor_t)vptr;
//    int res = executor_run(exec);
//
//    Local<Number> num = Number::New(isolate, res);
//    args.GetReturnValue().Set(num);
//}

void bitprim_executor_run_wait(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();

    // Check the number of arguments passed.
    if (args.Length() != 1) {
        isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Wrong number of arguments")));
        return;
    }

    if (!args[0]->IsExternal()) {
        isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Wrong arguments")));
        return;
    }

    void* vptr = v8::External::Cast(*args[0])->Value();
    executor_t exec = (executor_t)vptr;
    int res = executor_run_wait(exec);

    Local<Number> num = Number::New(isolate, res);
    args.GetReturnValue().Set(num);
}


// ---------------------------------------------

void bitprim_get_last_height(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();

    // Check the number of arguments passed.
    if (args.Length() != 1) {
        isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Wrong number of arguments")));
        return;
    }

    if (!args[0]->IsExternal()) {
        isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Wrong arguments")));
        return;
    }

    void* vptr = v8::External::Cast(*args[0])->Value();
    executor_t exec = (executor_t)vptr;
    size_t height;
    int res = get_last_height(exec, &height);

    Local<Number> num = Number::New(isolate, height);
    args.GetReturnValue().Set(num);
}
// ---------------------------------------------

Persistent<Function> callback;

//void validate_tx(executor_t exec, transaction_t tx, run_handler_t handler) {

void validate_tx_callback(int error, char* message) {
    Isolate* isolate = Isolate::GetCurrent();

    // printf("validate_tx_callback - 1\n");

    // printf("validate_tx_callback - error:   %d\n", error);
    // printf("validate_tx_callback - message: %s\n", message);

//    unsigned int const argc = 2;
////    Local<Value> argv[argc] = { Null(isolate), String::NewFromUtf8(isolate, "success") };
//    Local<Value> argv[argc] = { Null(isolate), Number::New(isolate, error) };

    unsigned int const argc = 2;
    if (message == nullptr) {
        message = "";
    }
    Local<Value> argv[argc] = { Number::New(isolate, error), String::NewFromUtf8(isolate, message) };



    // printf("validate_tx_callback - 2n");

    Local<Function>::New(isolate, callback)->Call(isolate->GetCurrentContext()->Global(), argc, argv);

    // printf("validate_tx_callback - 3\n");

    callback.Reset();

    // printf("validate_tx_callback - 4\n");
}

void bitprim_validate_tx(FunctionCallbackInfo<Value> const& args) {
    Isolate* isolate = args.GetIsolate();

    // printf("bitprim_validate_tx - 1\n");
    if (args.Length() != 3) {
        isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Wrong number of arguments")));
        return;
    }

    // printf("bitprim_validate_tx - 2\n");

    if ( ! args[0]->IsExternal()) {
        isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Wrong arguments")));
        return;
    }

    // printf("bitprim_validate_tx - 3\n");

    if ( ! args[1]->IsString()) {
        isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Wrong arguments")));
        return;
    }

    // printf("bitprim_validate_tx - 4\n");

    if ( ! args[2]->IsFunction()) {
        isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Wrong arguments")));
        return;
    }

    // printf("bitprim_validate_tx - 5\n");

    void* vptr = v8::External::Cast(*args[0])->Value();
    executor_t exec = (executor_t)vptr;

    // printf("bitprim_validate_tx - 6\n");


    v8::String::Utf8Value tx_hex(args[1]->ToString());

    // printf("bitprim_validate_tx - 7\n");


    callback.Reset(isolate, args[2].As<Function>());

    // printf("bitprim_validate_tx - 8\n");

    auto tx = hex_to_tx(*tx_hex);

    // printf("bitprim_validate_tx - 9\n");

    // printf("tx: %p\n", tx);

    validate_tx(exec, tx, validate_tx_callback);

    // printf("bitprim_validate_tx - 10\n");

    //TODO: free tx
}


//    void resize(const v8::FunctionCallbackInfo<Value> &args) {
//        Isolate *isolate = Isolate::GetCurrent();
//        HandleScope scope(isolate);
//        Persistent<Function> callback;
//        callback.Reset(isolate, args[0].As<Function>())
//        const unsigned argc = 2;
//        Local<Value> argv[argc] = { Null(isolate), String::NewFromUtf8(isolate, "success") };
//        Local<Function>::New(isolate, work->callback)->Call(isolate->GetCurrentContext()->Global(), argc, argv);
//        callback.Reset();
//    }

//-------------------

//Handle<Value> addEventListener(Arguments const& args) {
//    HandleScope scope;
//    if (!args[0]->IsFunction()) {
//        return ThrowException(Exception::TypeError(String::New("Wrong arguments")));
//    }
//
//    Persistent<Function> fn = Persistent<Function>::New(Handle<Function>::Cast(args[0]));
////    Local<Number> num = Number::New(registerListener(&callback, &fn));
//    Local<Number> num = Number::New(registerListener(&callback, *fn));
//
//    scope.Close(num);
//}
//
//void callback(int event, void* ctx ) {
//    HandleScope scope;
//    Local<Value> args[] = { Local<Value>::New(Number::New(event)) };
//    Persistent<Function> *func = static_cast<Persistent<Function> *>(context);
//    (* func)->Call((* func), 1, args);
//
//    scope.Close(Undefined());
//}

//-------------------


void init(Local<Object> exports) {
    NODE_SET_METHOD(exports, "construct", bitprim_executor_construct);
    NODE_SET_METHOD(exports, "destruct", bitprim_executor_destruct);
    NODE_SET_METHOD(exports, "stop", bitprim_executor_stop);
    NODE_SET_METHOD(exports, "initchain", bitprim_executor_initchain);
//    NODE_SET_METHOD(exports, "run", bitprim_executor_run);
    NODE_SET_METHOD(exports, "run_wait", bitprim_executor_run_wait);
    NODE_SET_METHOD(exports, "validate_tx", bitprim_validate_tx);
    NODE_SET_METHOD(exports, "get_last_height", bitprim_get_last_height);
}

NODE_MODULE(bitprim, init)

}  // namespace bitprim_ns
