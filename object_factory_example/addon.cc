// addon.cc
#include <node.h>
#include <inttypes.h>

namespace demo {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;
using v8::External;
using v8::Exception;
using v8::Number;

//void CreateObject(const FunctionCallbackInfo<Value>& args) {
//    Isolate* isolate = args.GetIsolate();
//
//    Local<Object> obj = Object::New(isolate);
//    obj->Set(String::NewFromUtf8(isolate, "msg"), args[0]->ToString());
//
//    args.GetReturnValue().Set(obj);
//}

void CreateObject(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();

    Local<Object> obj = Object::New(isolate);
    obj->Set(String::NewFromUtf8(isolate, "msg"), args[0]->ToString());

    args.GetReturnValue().Set(obj);
}

void make_data(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();

    int* ip = new int(15);

    printf("make_data: 0x%" PRIXPTR "\n", (uintptr_t)ip);

    Local<External> ext = External::New(isolate, ip);
    args.GetReturnValue().Set(ext);
}

void change_data(const FunctionCallbackInfo<Value>& args) {
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
    int* ip = (int*)vptr;
    printf("change_data: 0x%" PRIXPTR "\n", (uintptr_t)ip);

    *ip = *ip + 1;
}


void receive_data(const FunctionCallbackInfo<Value>& args) {
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
    int* ip = (int*)vptr;
    printf("receive_data: 0x%" PRIXPTR "\n", (uintptr_t)ip);

    Local<Number> num = Number::New(isolate, *ip);
    args.GetReturnValue().Set(num);
}

void Init(Local<Object> exports, Local<Object> module) {
//    NODE_SET_METHOD(module, "exports", CreateObject);

    NODE_SET_METHOD(exports, "make_data", make_data);
    NODE_SET_METHOD(exports, "change_data", change_data);
    NODE_SET_METHOD(exports, "receive_data", receive_data);
}

NODE_MODULE(addon, Init)

}  // namespace demo
