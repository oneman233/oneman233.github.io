---
layout: post
title: "大数板子"
date: 2019-09-02
tags: ["算法"]
comments: true
author: oneman233
excerpt: "向着python迈出一步"
---

支持大数和整数的除法，可以`cin`读入，输出使用`print`方法。

修改记录：

* 更正小于符号重载的错误
* 更正最大长度没有变化的错误

```c++
#include <bits/stdc++.h>
#define MAXN 9999
#define MAXSIZE 1000
#define DLEN 4
using namespace std;

class BigNum
{
private:
    int a[MAXSIZE];
    int len;
public:
    BigNum(){ len = 1;memset(a,0,sizeof(a)); }
    void XD();
    BigNum(const int);
    BigNum(const long long int);
    BigNum(const char*);
    BigNum(const string &);
    BigNum(const BigNum &);
    BigNum &operator = (const BigNum &);
    BigNum &operator = (const int &);
    BigNum &operator = (const long long int &);

    friend istream& operator >> (istream&,  BigNum&);
    friend ostream& operator << (ostream&,  BigNum&);

    template<typename T> BigNum operator << (const T &) const;
    template<typename T> BigNum operator >> (const T &) const;

    BigNum operator + (const BigNum &) const;
    BigNum operator - (const BigNum &) const;
    BigNum operator * (const BigNum &) const;
    bool   operator > (const BigNum& b)const;
    bool   operator < (const BigNum& b) const;
    bool   operator == (const BigNum& b) const;
    template<typename T> BigNum operator / (const T  &) const;
    template<typename T> BigNum operator ^ (const T  &) const;
    template<typename T> T    operator % (const T  &) const;

    template<typename T> BigNum operator + (const T& b) const {BigNum t = b; t = *this + t; return t;}
    template<typename T> BigNum operator - (const T& b) const {BigNum t = b; t = *this - t; return t;}
    template<typename T> BigNum operator * (const T& b) const {BigNum t = b; t = (*this) * t; return t;}
    template<typename T> bool   operator < (const T& b) const {BigNum t = b; return ((*this) < t);}
    template<typename T> bool   operator > (const T& b) const {BigNum t = b; return ((*this) > t);}
    template<typename T> bool   operator == (const T& b) const {BigNum t = b; return ((*this) == t);}

    bool   operator <= (const BigNum& b) const {return (*this) < b || (*this) == b;}
    bool   operator >= (const BigNum& b) const {return (*this) > b || (*this) == b;}
    bool   operator != (const BigNum& b) const {return !((*this) == b);}

    template<typename T> bool   operator >= (const T& b) const {BigNum t = b; return !((*this) < t);}
    template<typename T> bool   operator <= (const T& b) const {BigNum t = b; return !((*this) > t);}
    template<typename T> bool   operator != (const T& b) const {BigNum t = b; return !((*this) == t);}

    BigNum& operator += (const BigNum& b) {*this = *this + b; return *this;}
    BigNum& operator -= (const BigNum& b) {*this = *this - b; return *this;}
    BigNum& operator *= (const BigNum& b) {*this = *this * b; return *this;}
    template<typename T> BigNum& operator /= (const T& b) {*this = *this/b; return *this;}
    template<typename T> BigNum& operator %= (const T& b) {*this = *this%b; return *this;}
    template<typename T> BigNum& operator += (const T& b) {*this = *this+b; return *this;}
    template<typename T> BigNum& operator -= (const T& b) {*this = *this-b; return *this;}
    template<typename T> BigNum& operator *= (const T& b) {*this = *this*b; return *this;}
    template<typename T> BigNum& operator ^= (const T& b) {*this = *this^b; return *this;}

    BigNum operator ++ (int) {BigNum t = *this; *this += 1; return t;}
    BigNum operator -- (int) {BigNum t = *this; *this -= 1; return t;}
    BigNum& operator -- () {*this -= 1; return *this;}
    BigNum& operator ++ () {*this += 1; return *this;}

    template<typename T> BigNum& operator <<= (const T& b) {*this = *this << b; return *this;}
    template<typename T> BigNum& operator >>= (const T& b) {*this = *this >> b; return *this;}

    template<typename T> BigNum friend operator + (const T& a, const BigNum& b) {BigNum t = a; t = t + a; return t;}
    template<typename T> BigNum friend operator - (const T& a, const BigNum& b) {BigNum t = a; t = t - b; return t;}
    template<typename T> BigNum friend operator * (const T& a, const BigNum& b) {BigNum t = a; t = t * b; return t;}
    template<typename T> friend bool operator < (const T& a, const BigNum& b) {return b > a;}
    template<typename T> friend bool operator > (const T& a, const BigNum& b) {return b < a;}
    template<typename T> friend bool operator <= (const T& a, const BigNum& b) {return b >= a;}
    template<typename T> friend bool operator >= (const T& a, const BigNum& b) {return b <= a;}
    template<typename T> friend bool operator == (const T& a, const BigNum& b) {return b == a;}
    template<typename T> friend bool operator != (const T& a, const BigNum& b) {return b != a;}

    void print();    
    int Size();        
    int the_first();  
    int the_last();      
    int to_int();   
    long long int to_long();
    string to_String();
};

BigNum::BigNum(const int b) 
{
    int c,d = b;
    len = 0;
    memset(a,0,sizeof(a));
    while(d > MAXN){
        c = d - (d / (MAXN+1)) * (MAXN+1);
        d = d / (MAXN+1);
        a[len++] = c;
    }
    a[len++] = d;
}
BigNum::BigNum(const long long int b)
{
    long long int c,d = b;
    len = 0;
    memset(a,0,sizeof(a));
    while(d > MAXN){
        c = d - (d / (MAXN+1)) * (MAXN+1);
        d = d / (MAXN+1);
        a[len++] = c;
    }
    a[len++] = d;
}
BigNum::BigNum(const string& s)
{
    int t,k,index,l,i;
    memset(a,0,sizeof(a));
    l = s.size();
    len = l/DLEN;
    if(l%DLEN)
        len++;
    index = 0;
    for(i = l-1; i >=0 ;i -= DLEN){
        t = 0;
        k = i-DLEN+1;
        if(k < 0) k = 0;
        for(int j = k; j <= i; j++)
            t = t*10 + s[j]-'0';
        a[index++] = t;
    }
}
BigNum::BigNum(const char* s) 
{
    int t,k,index,l,i;
    memset(a,0,sizeof(a));
    l = strlen(s);
    len = l/DLEN;
    if(l%DLEN)
        len++;
    index = 0;
    for(i = l-1; i >= 0; i -= DLEN){
        t = 0;
        k = i - DLEN + 1;
        if(k < 0) k = 0;
        for(int j = k; j <= i; j++)
            t = t*10 + s[j] - '0';
        a[index++] = t;
    }
}
BigNum::BigNum(const BigNum & b) : len(b.len) 
{
    memset(a,0,sizeof(a));
    for(int i = 0 ; i < len ; i++)
        a[i] = b.a[i];
}
BigNum & BigNum::operator = (const BigNum& n) 
{
    len = n.len;
    memset(a,0,sizeof(a));
    for(int i = 0 ; i < len ; i++)
        a[i] = n.a[i];
    return *this;
}
BigNum & BigNum::operator = (const int& num)
{
    BigNum t(num);
    *this = t;
    return *this;
}
BigNum & BigNum::operator = (const long long int& num)
{
    BigNum t(num);
    *this = t;
    return *this;
}
istream& operator >> (istream & in, BigNum & b) 
{
    char ch[MAXSIZE*4];
    int i = -1;
    in>>ch;
    int l = strlen(ch);
    int cnt = 0, sum = 0;
    for(i = l-1; i >= 0; ){
        sum = 0;
        int t = 1;
        for(int j = 0; j < 4 && i >= 0; j++,i--,t *= 10)
            sum += (ch[i]-'0')*t;
        b.a[cnt] = sum;
        cnt++;
    }
    b.len = cnt++;
    return in;

}
ostream& operator << (ostream& out, BigNum& b)
{
    int i;
    cout << b.a[b.len - 1];
    for(i = b.len - 2 ; i >= 0 ; i--){
        cout.width(DLEN);
        cout.fill('0');
        cout << b.a[i];
    }
    return out;
}

template<typename T> BigNum BigNum::operator << (const T& b) const
{
    T temp = 1;
    for(int i = 0; i < b; i++)
        temp *= 2;
    BigNum t = (*this) * temp;
    return t;
}
template<typename T> BigNum BigNum::operator >> (const T& b) const
{
    T temp = 1;
    for(int i = 0; i < b; i++)
        temp *= 2;
    BigNum t = (*this) / temp;
    return t;
}

BigNum BigNum::operator + (const BigNum& b) const
{
    BigNum t(*this);
    int i,big;
    big = b.len > len ? b.len : len;
    for(i = 0 ; i < big ; i++){
        t.a[i] += b.a[i];
        if(t.a[i] > MAXN){
            t.a[i + 1]++;
            t.a[i] -=MAXN+1;
        }
    }
    if(t.a[big] != 0)
        t.len = big + 1;
    else
        t.len = big;
    return t;
}
BigNum BigNum::operator - (const BigNum& b) const 
{
    int i,j,big;
    bool flag;
    BigNum t1,t2;
    if(*this>b){
        t1 = *this;
        t2 = b;
        flag = 0;
    }
    else{
        t1 = b;
        t2 = *this;
        flag = 1;
    }
    big = t1.len;
    for(i = 0 ; i < big ; i++){
        if(t1.a[i] < t2.a[i]){
            j = i + 1;
            while(t1.a[j] == 0)
                j++;
            t1.a[j--]--;
            while(j > i)
                t1.a[j--] += MAXN;
            t1.a[i] += MAXN + 1 - t2.a[i];
        }
        else
            t1.a[i] -= t2.a[i];
    }
    t1.len = big;
    while(t1.a[t1.len - 1] == 0 && t1.len > 1){
        t1.len--;
        big--;
    }
    if(flag)
        t1.a[big-1] = 0-t1.a[big-1];
    return t1;
}

BigNum BigNum::operator * (const BigNum& b) const  
{
    BigNum ret;
    int i,j,up;
    int temp,temp1;
    for(i = 0 ; i < len ; i++){
        up = 0;
        for(j = 0 ; j < b.len ; j++){
            temp = a[i] * b.a[j] + ret.a[i + j] + up;
            if(temp > MAXN){
                temp1 = temp - temp / (MAXN + 1) * (MAXN + 1);
                up = temp / (MAXN + 1);
                ret.a[i + j] = temp1;
            }
            else{
                up = 0;
                ret.a[i + j] = temp;
            }
        }
        if(up != 0) ret.a[i + j] = up;
    }
    ret.len = i + j;
    while(ret.a[ret.len - 1] == 0 && ret.len > 1)
        ret.len--;
    return ret;
}
template<typename T> BigNum BigNum::operator / (const T& b) const
{
    BigNum ret;
    T i,down = 0;
    for(i = len - 1 ; i >= 0 ; i--){
        ret.a[i] = (a[i] + down * (MAXN + 1)) / b;
        down = a[i] + down * (MAXN + 1) - ret.a[i] * b;
    }
    ret.len = len;
    while(ret.a[ret.len - 1] == 0 && ret.len > 1)
        ret.len--;
    return ret;
}
template<typename T> T BigNum::operator % (const T& b) const
{
    T i,d=0;
    for (i = len-1; i>=0; i--){
        d = ((d * (MAXN+1))% b + a[i])% b;
    }
    return d;
}


template<typename T> BigNum BigNum::operator^(const T& n) const   
{
    BigNum t,ret(1);
    int i;
    if(n < 0) return 0;
    if(n == 0)
        return 1;
    if(n == 1)
        return *this;
    int m = n;
    while(m > 1){
        t =* this;
        for(i = 1; (i<<1) <= m;i <<= 1)
            t = t*t;
        m-=i;
        ret=ret*t;
        if(m == 1) ret = ret * (*this);
    }
    return ret;
}

bool BigNum::operator > (const BigNum& b) const 
{
    int tot;
    if(len > b.len)
        return true;
    else if(len == b.len){
        tot = len - 1;
        while(a[tot] == b.a[tot] && tot >= 0)
            tot--;
        if(tot >= 0 && a[tot] > b.a[tot])
            return true;
        else
            return false;
    }
    else
        return false;
}

bool BigNum::operator < (const BigNum& b) const
{
    int tot;
    if(len > b.len)
        return false;
    else if(len == b.len){
        tot = len - 1;
        while(a[tot] == b.a[tot] && tot >= 0)
            tot--;
        if(tot >= 0 && a[tot] > b.a[tot])
            return false;
        else
            return true;//
    }
    else
        return true;
}

bool BigNum::operator == (const BigNum& b) const
{
    int tot = len-1;
    if(len != b.len)
        return false;
    while(a[tot] == b.a[tot] && tot >= 0)
        tot--;
    if(tot < 0)
        return true;
    return false;
}

void BigNum::print() 
{
    int i;
    cout << a[len - 1];
    for(i = len-2; i >= 0; i--){
        cout.width(DLEN);
        cout.fill('0');
        cout << a[i];
    }
    cout << endl;
}
int BigNum::Size()
{
    int t = a[len-1],cnt = 0;
    while(t){ t /= 10; cnt++; }
    cnt += (len-1)*4;
    return cnt;
}
int BigNum::the_first()
{
    int t = a[len-1];
    while(t > 10){ t /= 10;}
    return t;
}
int BigNum::the_last()
{
    int t = a[0];
    return t%10;
}
int BigNum::to_int()
{
    int i,num;
    num = a[len-1];
    for(i = len-2; i >= 0; i--)
        num = num*(MAXN+1) + a[i];
    return num;
}
long long int BigNum::to_long()
{
    int i;
    long long int num;
    num = a[len-1];
    for(i = len-2; i >= 0; i--)
        num = num*(MAXN+1) + a[i];
    return num;
}

int main()
{
	BigNum a,b;
	cin>>a>>b;
	(a+b).print();
	return 0;
}
```